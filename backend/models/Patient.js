import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    idNos: { type: String, unique: true, required: true },
    name: String,
    dateOfBirth: Date,
    medicalDevices: [{ id: String, type: String }],
    medicalRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicalRecord' }],
    keycloakId: { type: String, unique: true, required: true },
    urgentContact: {
        name: String,
        phoneNumber: String
    }
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;