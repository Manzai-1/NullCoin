import mongoose from 'mongoose';

const nodeSchema = new mongoose.Schema({
    nodeAddress: {
        type: String,
        required: [true, 'Node Address is required']
    }
});

export default mongoose.model('Node', nodeSchema);