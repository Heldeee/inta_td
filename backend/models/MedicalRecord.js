import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
    patientId: { type: String, required: true },
    diagnosis: String,
    date: Date,
    notes: String
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
export default MedicalRecord;
