import mongoose from 'mongoose';

const blockchainSchema = new mongoose.Schema({
	timestamp: {
		type: String,
	},
	hash: {
		type: String,
	},
	lastHash: {
		type: String,
	},
	data: [
		{
			id: {
				type: String,
			},
            outputMap: {
				type: Map
			},
            input: {
                timestamp: {
                    type: String
                },
                amount: {
                    type: Number
                },
                address: {
                    type: String
                },
                signature: {
                    type: String
                }
            }
		},
	],
	nonce: {
		type: Number,
	},
	difficulty: {
		type: Number,
	},
});

export default mongoose.model('Blockchain', blockchainSchema);
