import { blockchain } from '../server.mjs';
import { parseChain } from '../utilities/parseChain.mjs';
import blockchainModel from '../models/schema/blockchainModel.mjs';

export default class BlockRepositories{
    listAllBlocks(){
        blockchain.chain.forEach(block => {
            block.data.forEach(tx => {
                console.log(tx);
            })
        })
        
        return parseChain(blockchain.chain);
    }

    async backupChain(chain) {
        await blockchainModel.deleteMany();
        await blockchainModel.create(chain);
    }
}