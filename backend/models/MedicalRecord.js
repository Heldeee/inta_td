import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
    deviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
    recordDate: Date,
    bloodPressure: String,
    heartRate: String,
    oxygenSaturation: String,
    notes: String
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
export default MedicalRecord;
