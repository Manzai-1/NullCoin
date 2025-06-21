import nodeModel from '../models/nodeModel.mjs';

export default class NodeRepository {
    async add(node) {
        await nodeModel.create(node);
        return node;
    }

    async listAll() {
        return await nodeModel.find();
    }

    async remove(id) {
        await nodeModel.findByIdAndDelete(id);
    }
}