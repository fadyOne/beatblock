import { Field, PublicKey, MerkleMap } from 'snarkyjs';
import { Vote } from './sequencer';
export { Nullifier, calculateNullifierRootTransition, calculateVotes };
declare function Nullifier(publicKey: PublicKey, proposalId: Field): any;
declare function calculateNullifierRootTransition(nullifierTree: MerkleMap, votes: Vote[]): {
    rootBefore: any;
    rootAfter: any;
};
declare function calculateVotes(votes: Vote[]): {
    yes: any;
    no: any;
    abstained: any;
};
