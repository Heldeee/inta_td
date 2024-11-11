import MedicalRecord from '../models/MedicalRecord.js';

// Get a patient's medical records by idNos
export const getMedicalRecordsByPatientIdNos = async (req, res) => {
    try {
        const patientIdNos = req.params.idNos;

        const records = await MedicalRecord.find({ patientIdNos: patientIdNos });

        if (records.length === 0) {
            return res.status(404).json({ message: 'No records found for this patient.' });
        }

        res.json(records);
    } catch (error) {
        console.error('Error fetching medical records:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new medical record for a patient
export const createMedicalRecord = async (req, res) => {
    try {
        const { patientIdNos, recordDate, bloodPressure, heartRate, oxygenSaturation, notes } = req.body;

        // Create a new medical record document
        const newRecord = new MedicalRecord({
            patientIdNos,
            recordDate,
            bloodPressure,
            heartRate,
            oxygenSaturation,
            notes
        });

        // Save the new record to the database
        await newRecord.save();

        res.status(201).json({ message: 'Medical record created successfully', record: newRecord });
    } catch (error) {
        console.error('Error creating medical record:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all medical records
export const getAllMedicalRecords = async (req, res) => {
    try {
        const records = await MedicalRecord.find();

        if (records.length === 0) {
            return res.status(404).json({ message: 'No records found.' });
        }

        res.json(records);
    } catch (error) {
        console.error('Error fetching medical records:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};