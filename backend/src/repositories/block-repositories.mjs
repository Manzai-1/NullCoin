import { blockchain } from '../server.mjs';
import { parseChain } from '../utilities/parseChain.mjs';

export default class BlockRepositories{
    listAllBlocks(){
        return parseChain(blockchain.chain);
    }
}