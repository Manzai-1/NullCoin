import TransactionRepositories from '../repositories/tx-repositories.mjs';

export const listAllTransactions = (req, res) => {
	const mempool = new TransactionRepositories().listAllTransactions();

	res.status(200).json({
		success: true,
		statusCode: 200,
		data: mempool,
	});
};

export const mineTransactions = (req, res) => {
	const miner = req.user.username;
	newBlock = new TransactionRepositories().mineTransactions(miner);

	res.status(200).json({
		success: true,
		statusCode: 200,
		data: newBlock,
	});
};
