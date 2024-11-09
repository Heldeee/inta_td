const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    patientId: { type: String, required: true },
    diagnosis: String,
    date: Date,
    notes: String
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
