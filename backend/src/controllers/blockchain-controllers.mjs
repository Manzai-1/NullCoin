import BlockRepositories from "../repositories/block-repositories.mjs";

export const listAllBlocks = (req, res) => {
  const chain = new BlockRepositories().listAllBlocks();
  res.status(200).json({ success: true, data: chain });
};