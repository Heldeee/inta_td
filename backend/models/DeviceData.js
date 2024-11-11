import mongoose from 'mongoose';

const medicalDeviceSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Professional', required: true },
    installationDate: { type: Date, default: Date.now }
});

const MedicalDevice = mongoose.model('MedicalDevice', medicalDeviceSchema);
export default MedicalDevice;