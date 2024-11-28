import MedicalRecord from '../models/MedicalRecord.js';

export const getMedicalRecordsByDeviceId = async (req, res) => {
    try {
        const deviceId = req.params.id;

        const records = await MedicalRecord.find({ deviceId: deviceId });

        if (records.length === 0) {
            return res.status(404).json({ message: 'No records found for this device.' });
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
        const { patientId, recordDate, bloodPressure, heartRate, oxygenSaturation, notes } = req.body;

        // Create a new medical record document
        const newRecord = new MedicalRecord({
            patientId,
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

// Get a single medical record by ID
export const getMedicalRecordById = async (req, res) => {
    try {
        const recordId = req.params.id;

        const record = await MedicalRecord.findById(recordId);

        if (!record) {
            return res.status(404).json({ message: 'Record not found.' });
        }

        res.json(record);
    } catch (error) {
        console.error('Error fetching medical record:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};