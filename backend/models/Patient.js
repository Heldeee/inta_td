import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    idNos: { type: String, unique: true, required: true },
    name: String,
    dateOfBirth: Date,
    medicalDevices: [
        {
            id: String,
            type: String
        }
    ]
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;