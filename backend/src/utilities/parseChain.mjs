export const parseChain = (chain) => {
	return chain.map((block, i) => {
		return {
			block_number: i,
			timestamp: new Date(block.timestamp).toLocaleString('sv-SE'),
			hash: block.hash,
			transactions: block.data.map((tx, j) => {
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

export const parseTxs = (data) => {
	return Object.values(data).map((tx, i) => {
		const addresses = Object.keys(tx.outputMap);
		return {
			tx_number: i,
			timestamp: new Date(tx.input.timestamp).toLocaleString('sv-SE'),
			address: addresses[1],
			recipient: addresses[0],
			amount: tx.outputMap[addresses[0]],
		};
	});
};
