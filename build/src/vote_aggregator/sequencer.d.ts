import { PublicKey, Field, UInt32, PrivateKey } from 'snarkyjs';
export { VoterData, Vote, Proposal, StateTransition, VotingPeriod, Voting, MerkleMapExtended, };
declare const Proposal_base: any;
declare class Proposal extends Proposal_base {
}
declare const StateTransition_base: any;
declare class StateTransition extends StateTransition_base {
}
declare const VotingPeriod_base: any;
declare class VotingPeriod extends VotingPeriod_base {
}
declare const VoterData_base: any;
declare class VoterData extends VoterData_base {
    hash(): Field;
    toJSON(): {
        publicKey: any;
        weight: any;
    };
}
type JSONVote = {
    voter: string;
    authorization: {
        r: string;
        s: string;
    };
    voterDataRoot: string;
    yes: string;
    no: string;
    abstained: string;
    proposalId: string;
};
declare const Vote_base: any;
declare class Vote extends Vote_base {
    fromJSON(json: JSONVote): Vote;
    verifySignature(publicKey: PublicKey): any;
}
declare function MerkleMapExtended<V extends {
    hash(): Field;
    toJSON(): any;
}>(): {
    get(key: Field): V;
    set(key: Field, value: V): void;
    getRoot(): Field;
    getWitness(key: Field): MerkleMapWitness;
    flat(): {
        meta: {
            root: any;
            height: any;
            leafCount: any;
        };
        leaves: {
            i: number;
            key: string;
            data: any;
        }[];
    };
};
declare function Voting({ proposalTitle, proposalId, feePayer, electionPeriod, challengingPeriod, voterData, }: {
    proposalTitle: string;
    proposalId: string;
    feePayer: PrivateKey;
    electionPeriod: {
        start: UInt32;
        end: UInt32;
    };
    challengingPeriod: {
        start: UInt32;
        end: UInt32;
    };
    voterData: {
        publicKey: PublicKey;
        weight: Field;
    }[];
}): {
    deploy(): Promise<void>;
    listen(): Promise<void>;
};
