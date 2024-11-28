import MedicalDevice from '../models/Device.js';
import MedicalRecord from '../models/MedicalRecord.js';
import mongoose from 'mongoose';

export const getDeviceDataById = async (req, res) => {
    try {
        const deviceId = mongoose.Types.ObjectId.isValid(req.params.deviceId)
            ? mongoose.Types.ObjectId(req.params.deviceId)
            : req.params.deviceId;

        const deviceData = await MedicalDevice.findById(deviceId).populate('patientId doctorId');

        if (!deviceData) {
            return res.status(404).json({ message: 'Device not found.' });
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
            return res.status(200).json([]); // Return an empty array if no devices are found
        }

        res.json(allDevices);
    } catch (error) {
        console.error('Error fetching all devices:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getDeviceRecordsById = async (req, res) => {
    try {
        const deviceId = mongoose.Types.ObjectId.isValid(req.params.deviceId)
            ? mongoose.Types.ObjectId(req.params.deviceId)
            : req.params.deviceId;

        const records = await MedicalRecord.find({ deviceId: deviceId });

        if (records.length === 0) {
            //return empty array if no records are found
            return res.status(200).json([]);
        }

        res.json(records);
    } catch (error) {
        console.error('Error fetching medical records:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
