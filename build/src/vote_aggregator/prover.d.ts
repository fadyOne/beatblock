import { MerkleMap } from 'snarkyjs';
import { MerkleMapExtended } from './sequencer.js';
export { Prover };
declare function Prover(nullifierTree: MerkleMap, voterData: ReturnType<typeof MerkleMapExtended>): any;
