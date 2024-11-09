const Patient = require('../models/Patient');

// Get patient data by ID
const getPatientInfo = async (req, res) => {
    try {
        const patient = await Patient.findOne({ idNos: req.params.id });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json(patient);
    } catch (error) {
        console.error('Error fetching patient data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get list of all patients
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        console.error('Error fetching patients list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getPatientInfo,
    getAllPatients
};
