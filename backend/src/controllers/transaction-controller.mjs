import { transactionPool, server, blockchain } from '../server.mjs';
import Miner from '../models/miner/Miner.mjs';
import Wallet from '../models/wallet/Wallet.mjs';

export const addTransaction = (req, res) => {
	const { amount, recipient } = req.body;
	const address = req.user.username;

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
		return res
			.status(400)
			.json({ success: false, statusCode: 400, error: error.message });
	}
	transaction.recipient = recipient;
	transactionPool.addTransaction(transaction);
	server.broadcastTransaction(transaction);

	res.status(201).json({ success: true, statusCode: 201, data: transaction });
};

export const getWalletInfo = (req, res) => {
	const address = req.user.username;
	const balance = Wallet.calculateBalance({
		chain: blockchain.chain,
		address: address,
	});

	res.status(200).json({
		success: true,
		statusCode: 200,
		data: { address, balance },
	});
};

export const listAllTransactions = (req, res) => {
	res.status(200).json({
		success: true,
		statusCode: 200,
		data: transactionPool.transactionMap,
	});
};

export const mineTransactions = (req, res) => {
	const miner = req.user.username;

	Miner.mineTransactions({ transactionPool, miner, blockchain, server });

	res.status(200).json({
		success: true,
		statusCode: 200,
		data: blockchain.chain.at(-1),
	});
};
