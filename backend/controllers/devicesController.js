import MedicalDevice from '../models/Device.js';
import mongoose from 'mongoose';

export const getDeviceDataByPatientId = async (req, res) => {
    try {
        const patientId = mongoose.Types.ObjectId.isValid(req.params.patientId)
            ? mongoose.Types.ObjectId(req.params.patientId)
            : req.params.patientId;

        const deviceData = await MedicalDevice.find({ patient_id: patientId }).populate('patientId doctorId');

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

    const patientIdObj = mongoose.Types.ObjectId(patientId);
    const doctorIdObj = mongoose.Types.ObjectId(doctorId);

    try {
        const newDevice = new MedicalDevice({
            patientId: patientIdObj,
            doctorId: doctorIdObj,
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
        const allDevices = await MedicalDevice.find().populate('patientId doctorId');

        if (!allDevices.length) {
            return res.status(404).json({ message: 'No devices found.' });
        }

        res.json(allDevices);
    } catch (error) {
        console.error('Error fetching all devices:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};