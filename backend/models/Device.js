import mongoose from 'mongoose';

const medicalDeviceSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Professional', required: true },
    installationDate: { type: Date, default: Date.now },
    records: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicalRecord' }]
});

const MedicalDevice = mongoose.model('MedicalDevice', medicalDeviceSchema);
export default MedicalDevice;