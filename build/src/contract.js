var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Experimental, MerkleMap, SmartContract, method, state, State, Struct, Field, UInt32, } from 'snarkyjs';
import { Prover } from './vote_aggregator/prover';
import { MerkleMapExtended, VotingPeriod, } from './vote_aggregator/sequencer';
export { SettlementContract };
const RecursiveVoteProof_ = Experimental.ZkProgram.Proof(Prover(new MerkleMap(), MerkleMapExtended()));
class RecursiveVoteProof extends RecursiveVoteProof_ {
}
class ProposalPure extends Struct({
    id: Field,
    // we can add as many or as less options as we want
    yes: Field,
    no: Field,
    abstained: Field,
}) {
}
class SettlementContract extends SmartContract {
    constructor() {
        super(...arguments);
        // this is the proposal that we are voting on
        this.proposal = State();
        // just some "meta data" to guide the vote - start, end, ..
        this.votingPeriod = State();
        this.nullifierRoot = State();
        this.voterDataRoot = State();
    }
    init() {
        super.init();
        this.proposal.set({
            abstained: Field(0),
            id: Field(0),
            no: Field(0),
            yes: Field(0),
        });
        this.votingPeriod.set({
            electionPeriod: {
                start: UInt32.from(0),
                end: UInt32.from(10),
            },
            challengingPeriod: {
                start: UInt32.from(10),
                end: UInt32.from(5),
            },
        });
    }
    verifyVoteBatch(pi) {
        // "fetch" the on-chain proposal data
        let proposal = this.proposal.get();
        this.proposal.assertEquals(proposal);
        // "fetch" the on-chain voting period data
        let votingPeriod = this.votingPeriod.get();
        this.votingPeriod.assertEquals(votingPeriod);
        // "fetch" the on-chain network state
        let blockchainLength = this.network.blockchainLength.get();
        this.network.blockchainLength.assertEquals(blockchainLength);
        // "fetch" the on-chain nullifier root
        let nullifierRoot = this.nullifierRoot.get();
        this.nullifierRoot.get().assertEquals(nullifierRoot);
        // "fetch" the on-chain nullifier root
        let voterDataRoot = this.voterDataRoot.get();
        this.voterDataRoot.get().assertEquals(voterDataRoot);
        // check that the voting period is over, and we can only submit proofs after the voting phase
        blockchainLength.assertGte(votingPeriod.electionPeriod.end);
        /*
        Proofs have public and private inputs. The private inputs are only accessible to the user who generates the proof,
        but the public input is always accessible (or rather should be!) - hence called public input - its also required to verify a proof.
        the proof will *only* verify if a) the proof is truly valid and b) the public input matches the proof!
        This is why we constraint things to the public input inside the proof generation part!
        That means, we have to match our off-chain proof to our on-chain state. And we want to only verify proofs that are
        truly for our proposal. for that, we use the proposalId! We say "you can only verify this proof if it is for our proposal, with proposalId #123"
        */
        proposal.id.assertEquals(pi.publicInput.proposalId);
        // we also have to check that the voter data actually matches the expected data!
        voterDataRoot.assertEquals(pi.publicInput.voterDataRoot);
        // now we actually verify the proof!
        pi.verify();
        /*
        we check that we only make valid transitions.
        it is important to use the smart contract as a settlement layer and only periodically update its state
        but when that update happens, its important to prove a sound state transition without gaps! otherwise there might be vulnerabilities
        this is needed if we want to verify not only one proof, but have multiple proofs that compose our result, like this
        proof1 = 5yes, 3no, 0abstained
        proof2 = 1yes, 3no, 2abstained
        and we call this contract method in series, first with proof1 and then with proof2
        thats when we want to make sure that we don't double count votes ad the transition is valid
        */
        let resultsBefore = pi.publicInput.result.before;
        proposal.yes.assertEquals(resultsBefore.yes);
        proposal.no.assertEquals(resultsBefore.no);
        proposal.abstained.assertEquals(resultsBefore.abstained);
        /*
        same goes for the nullifier root!
        since the nullifier is a data structure that constantly changes and attests to who votes and who hasn't
        we also have to keep that up to date
        */
        pi.publicInput.nullifier.before.assertEquals(nullifierRoot);
        // we apply the votes to our on-chain proposal
        let resultsAfter = pi.publicInput.result.after;
        proposal.yes = resultsAfter.yes;
        proposal.no = resultsAfter.no;
        proposal.abstained = resultsAfter.abstained;
        // finally we update our on-chain state with the latest result!
        this.proposal.set(proposal);
        // we update our new nullifier root!
        // the proof says a) we aggregates all results and b) the nullifier root changes based on the results and votes
        this.nullifierRoot.set(pi.publicInput.nullifier.after);
    }
    challengeResult(pi) {
        // "fetch" the on-chain proposal data
        let proposal = this.proposal.get();
        this.proposal.assertEquals(proposal);
        // "fetch" the on-chain voting period data
        let votingPeriod = this.votingPeriod.get();
        this.votingPeriod.assertEquals(votingPeriod);
        // "fetch" the on-chain network state
        let blockchainLength = this.network.blockchainLength.get();
        this.network.blockchainLength.assertEquals(blockchainLength);
        // check that the voting period is over, and we can only submit proofs after the voting phase
        blockchainLength.assertGte(votingPeriod.electionPeriod.end);
        // we can only challenge the vote in the challenging period!
        votingPeriod.challengingPeriod.start.assertGte(blockchainLength);
        votingPeriod.challengingPeriod.end.assertLte(blockchainLength);
        pi.verify();
        // ..
    }
}
__decorate([
    state(ProposalPure),
    __metadata("design:type", Object)
], SettlementContract.prototype, "proposal", void 0);
__decorate([
    state(VotingPeriod),
    __metadata("design:type", Object)
], SettlementContract.prototype, "votingPeriod", void 0);
__decorate([
    state(Field),
    __metadata("design:type", Object)
], SettlementContract.prototype, "nullifierRoot", void 0);
__decorate([
    state(Field),
    __metadata("design:type", Object)
], SettlementContract.prototype, "voterDataRoot", void 0);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettlementContract.prototype, "init", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RecursiveVoteProof]),
    __metadata("design:returntype", void 0)
], SettlementContract.prototype, "verifyVoteBatch", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RecursiveVoteProof]),
    __metadata("design:returntype", void 0)
], SettlementContract.prototype, "challengeResult", null);
//# sourceMappingURL=contract.js.map