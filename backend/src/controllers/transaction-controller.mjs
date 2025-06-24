import TransactionRepositories from '../repositories/tx-repositories.mjs';
import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';

export const listAllTransactions = (req, res) => {
	const mempool = new TransactionRepositories().listAllTransactions();

	res.status(200).json({
		success: true,
		statusCode: 200,
		data: mempool,
	});
};

export const mineTransactions = catchErrorAsync(async (req, res) => {
	const miner = req.user.username;
	const newBlock = await new TransactionRepositories().mineTransactions(miner);

	res.status(200).json({
		success: true,
		statusCode: 200,
		data: newBlock,
	});
});
