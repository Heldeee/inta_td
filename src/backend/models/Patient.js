const mongoose = require('mongoose');

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

module.exports = mongoose.model('Patient', patientSchema);
