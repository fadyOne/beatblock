import { SmartContract } from 'o1js';
export { SettlementContract };
declare const RecursiveVoteProof_: any;
declare class RecursiveVoteProof extends RecursiveVoteProof_ {
}
declare class SettlementContract extends SmartContract {
    proposal: any;
    votingPeriod: any;
    nullifierRoot: any;
    voterDataRoot: any;
    init(): void;
    verifyVoteBatch(pi: RecursiveVoteProof): void;
    challengeResult(pi: RecursiveVoteProof): void;
}
