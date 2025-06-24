import Miner from "../models/miner/Miner.mjs";
import { transactionPool, server, blockchain } from '../server.mjs';

export default class TransactionRepositories{
    listAllTransactions(){
        return transactionPool.transactionMap;
    }

    mineTransactions(miner){
        Miner.mineTransactions({ transactionPool, miner, blockchain, server });
        return blockchain.chain.at(-1);
    }
}