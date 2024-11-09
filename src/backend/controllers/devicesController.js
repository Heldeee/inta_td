const DeviceData = require('../models/DeviceData');

// Get device data for a patient by ID
const getDeviceDataByPatientId = async (req, res) => {
    try {
        const deviceData = await DeviceData.find({ patientId: req.params.patientId });
        res.json(deviceData);
    } catch (error) {
        console.error('Error fetching device data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getDeviceDataByPatientId
};
