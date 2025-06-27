import Miner from "../models/miner/Miner.mjs";
import { transactionPool, server, blockchain } from '../server.mjs';
import { parseTxs } from "../utilities/parseChain.mjs";
import BlockRepositories from "./block-repositories.mjs";

export default class TransactionRepositories{
    listAllTransactions(){
        return parseTxs(transactionPool.transactionMap);
    }

    async mineTransactions(miner){
        Miner.mineTransactions({ transactionPool, miner, blockchain, server });
        await new BlockRepositories().backupChain(blockchain.chain);
        return blockchain.chain.at(-1);
    }
}