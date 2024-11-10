import MedicalRecord from '../models/MedicalRecord.js';

// Get a patient's medical records
export const getMedicalRecordsByPatientId = async (req, res) => {
    try {
        const records = await MedicalRecord.find({ patientId: req.params.patientId });
        res.json(records);
    } catch (error) {
        console.error('Error fetching medical records:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};