import mongoose from 'mongoose';

const cabinetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: String,
    phone: String
});

const Cabinet = mongoose.model('Cabinet', cabinetSchema);
export default Cabinet;