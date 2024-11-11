import mongoose from 'mongoose';


const professionalSchema = new mongoose.Schema({
    idNos: { type: String, unique: true, required: true },
    name: String,
    role: String,
    specialization: String
});

const Professional = mongoose.model('Professional', professionalSchema);
export default Professional;
