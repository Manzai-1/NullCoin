import Transaction from '../wallet/Transaction.mjs';

export default class Miner {
	static mineTransactions({ transactionPool, miner, blockchain, server }) {
		let validTransactions = [];

		validTransactions = transactionPool.validateTransactions();

		validTransactions.push(
			Transaction.transactionReward({ miner })
		);

		blockchain.addBlock({ data: validTransactions });

		server.broadcastChain();

		transactionPool.clearTransactions();
	}
}
