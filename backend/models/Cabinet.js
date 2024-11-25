import mongoose from 'mongoose';

const cabinetSchema = new mongoose.Schema({
    idNos: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    address: String,
    phone: String
});

const Cabinet = mongoose.model('Cabinet', cabinetSchema);
export default Cabinet;