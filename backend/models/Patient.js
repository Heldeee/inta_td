import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    idNos: { type: String, unique: true, required: true },
    name: String,
    dateOfBirth: Date,
    keycloakId: { type: String, unique: true, required: true }
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;