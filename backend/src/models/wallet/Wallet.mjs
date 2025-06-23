import { INITIAL_BALANCE } from '../../utilities/config.mjs';
import Transaction from './Transaction.mjs';

export default class Wallet {
	static calculateBalance({ chain, address }) {
		let total = 0,
			hasMadeTransaction = false;

		for (let i = chain.length - 1; i > 0; i--) {
			const block = chain[i];

			for (let transaction of block.data) {
				if (transaction.input.address === address) hasMadeTransaction = true;

				const amount = transaction.outputMap[address];

				if (amount) {
					total += amount;
				}
			}

			if (hasMadeTransaction) break;
		}
		return hasMadeTransaction ? total : INITIAL_BALANCE + total;
	}

	static createTransaction({ address, recipient, amount, chain }) {
		const balance =
			chain.length > 1
				? this.calculateBalance({ chain, address })
				: INITIAL_BALANCE;

		if (amount > balance) throw new Error('Not enough funds!');
		return new Transaction({
			sender: { address, balance },
			recipient,
			amount,
		});
	}
}
