import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import NodeRepository from '../repositories/node-repositories.mjs';

export const addNode = catchErrorAsync(async (req, res) => {
  const node = await new NodeRepository().add(req.body);
  res
    .status(201)
    .json({ success: true, statusCode: 201, data: { node: node } });
});

export const listNodes = catchErrorAsync(async (req, res) => {
  const nodes = await new NodeRepository().listAll();
  res
    .status(201)
    .json({ success: true, statusCode: 201, data: { nodes: nodes } });
});
