import DeviceData from '../models/DeviceData.js';

// Get device data for a patient by ID
export const getDeviceDataByPatientId = async (req, res) => {
    try {
        const deviceData = await DeviceData.find({ patientId: req.params.patientId });
        res.json(deviceData);
    } catch (error) {
        console.error('Error fetching device data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
