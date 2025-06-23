import { blockchain } from '../server.mjs';
import { parseChain } from '../utilities/parseChain.mjs';

export const listAllBlocks = (req, res) => {
  const chain = parseChain(blockchain.chain);
  res.status(200).json({ success: true, data: chain });
};