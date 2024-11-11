import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
    patientIdnos: String,
    recordDate: Date,
    bloodPressure: String,
    heartRate: String,
    oxygenSaturation: String,
    notes: String
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
export default MedicalRecord;
