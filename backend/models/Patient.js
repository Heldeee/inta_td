import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    idNos: { type: String, unique: true, required: true },
    name: String,
    dateOfBirth: Date,
    gender: String,
    cabinetId: { type: String, required: true },
    keycloakId: { type: String, unique: true, required: true },
    urgentContact: {
        name: String,
        phoneNumber: String
    }
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;