import mongoose from 'mongoose';

const professionalSchema = new mongoose.Schema({
    name: String,
    role: String,
    specialization: String,
    cabinetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cabinet', required: true },
});

const Professional = mongoose.model('Professional', professionalSchema);
export default Professional;
