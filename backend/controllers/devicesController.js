import MedicalDevice from '../models/DeviceData.js';
import mongoose from 'mongoose';

export const getDeviceDataByPatientId = async (req, res) => {
    try {
        // Check if the patientId is a valid ObjectId, otherwise treat it as a string ID
        const patientId = mongoose.Types.ObjectId.isValid(req.params.patientId)
            ? mongoose.Types.ObjectId(req.params.patientId) // Convert to ObjectId if it's valid
            : req.params.patientId; // Otherwise, treat it as a string (for keycloakId or custom field)

        // Find the medical devices by patient_id (either MongoDB ObjectId or custom ID)
        const deviceData = await MedicalDevice.find({ patient_id: patientId }).populate('patient_id doctor_id');

        // Check if no device data is found
        if (!deviceData.length) {
            return res.status(404).json({ message: 'No devices found for this patient.' });
        }

        // Return the device data
        res.json(deviceData);
    } catch (error) {
        console.error('Error fetching device data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const addMedicalDevice = async (req, res) => {
    const { patientId, doctorId, type, installationDate } = req.body;

    // Convert patientId and doctorId to ObjectIds
    const patientIdObj = mongoose.Types.ObjectId(patientId);
    const doctorIdObj = mongoose.Types.ObjectId(doctorId);

    try {
        const newDevice = new MedicalDevice({
            patient_id: patientIdObj,
            doctor_id: doctorIdObj,
            type,
            installationDate: installationDate || new Date()
        });

        await newDevice.save();
        res.status(201).json(newDevice);
    } catch (error) {
        console.error('Error adding medical device:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllDevices = async (req, res) => {
    try {
        // Fetch all devices with populated patient_id and doctor_id fields
        const allDevices = await MedicalDevice.find().populate('patient_id doctor_id');

        // Check if no devices are found
        if (!allDevices.length) {
            return res.status(404).json({ message: 'No devices found.' });
        }

        // Return all device data
        res.json(allDevices);
    } catch (error) {
        console.error('Error fetching all devices:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};