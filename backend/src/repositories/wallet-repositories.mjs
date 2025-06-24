import { transactionPool, server, blockchain } from '../server.mjs';
import AppError from '../models/AppError.mjs';
import Wallet from '../models/wallet/Wallet.mjs';
import { parseChain } from '../utilities/parseChain.mjs';

export default class WalletRepositories {
	addTransaction({ address, recipient, amount }) {
		let transaction = transactionPool.transactionExists({
			address,
		});

		try {
			if (!transaction) {
				transaction = Wallet.createTransaction({
					address,
					recipient,
					amount,
					chain: blockchain.chain,
				});
			}
		} catch (error) {
			throw new AppError(error.message, 400);
		}

		transaction.recipient = recipient;
		transactionPool.addTransaction(transaction);
		server.broadcastTransaction(transaction);

		return transaction;
	}

	getWalletInfo(address) {
		return Wallet.calculateBalance({
			chain: blockchain.chain,
			address: address,
		});
	}

	getWalletHistory(address) {
		const history = {
			transactions: [],
			minedBlocks: [],
		};
		const chain = parseChain(blockchain.chain);
		const txs = chain.flatMap((block) => block.transactions);
        
		txs.forEach((tx) => {
			const isReward = tx.address === 'MINE REWARD';
			const addressMatch =
				tx.address === address || tx.recipient === address;

			if (isReward && addressMatch) {
				history.minedBlocks.push(
					chain.find(
						(block) => block.block_number === tx.block_number
					)
				);
			} else if (addressMatch) {
				history.transactions.push(tx);
			}
		});

		return history;
	}
}
