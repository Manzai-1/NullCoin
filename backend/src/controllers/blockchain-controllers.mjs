import { blockchain } from '../server.mjs';
import { server } from '../server.mjs';

export const listAllBlocks = (req, res) => {
  res.status(200).json({ success: true, data: blockchain.chain });
};

export const addBlock = (req, res) => {
  const { data } = req.body;

  blockchain.addBlock({ data });

  server.broadcastChain();

  res
    .status(201)
    .json({ success: true, message: 'Block is added', data: blockchain.chain });
};
