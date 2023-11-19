import { Field, Poseidon } from 'snarkyjs';
export { Nullifier, calculateNullifierRootTransition, calculateVotes };
function Nullifier(publicKey, proposalId) {
    return Poseidon.hash(publicKey.toFields().concat(proposalId));
}
function calculateNullifierRootTransition(nullifierTree, votes) {
    let rootBefore = nullifierTree.getRoot();
    votes.forEach((v) => {
        let key = Nullifier(v.voter, v.proposalId);
        nullifierTree.set(key, Field(1));
    });
    return {
        rootBefore,
        rootAfter: nullifierTree.getRoot(),
    };
}
function calculateVotes(votes) {
    let yes = Field(0);
    let no = Field(0);
    let abstained = Field(0);
    votes.forEach((v) => {
        yes = yes.add(v.yes);
        no = no.add(v.no);
        abstained = abstained.add(v.abstained);
    });
    return {
        yes,
        no,
        abstained,
    };
}
//# sourceMappingURL=lib.js.map