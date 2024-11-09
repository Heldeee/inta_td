const mongoose = require('mongoose');

const professionalSchema = new mongoose.Schema({
    idNos: { type: String, unique: true, required: true },
    name: String,
    role: String, // e.g., Cardiologist, Nurse
    specialization: String
});

module.exports = mongoose.model('Professional', professionalSchema);
