export const parseChain = (chain) => {
	return chain.map((block, i) => {
		return {
			block_number: i,
			timestamp: new Date(block.timestamp).toLocaleString('sv-SE'),
			hash: block.hash,
			Transactions: block.data.map((tx, j) => {
				const addresses = Object.keys(tx.outputMap);

				return {
					tx_number: j,
					block_number: i,
					address: addresses[1] || 'MINE REWARD',
					recipient: addresses[0],
					amount: tx.outputMap[addresses[0]],
				};
			}),
		};
	});
};
