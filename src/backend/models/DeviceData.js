const mongoose = require('mongoose');

const deviceDataSchema = new mongoose.Schema({
    patientId: { type: String, required: true },
    deviceId: { type: String, required: true },
    timestamp: Date,
    data: Object // Store actual device data here, could be customized for different devices
});

module.exports = mongoose.model('DeviceData', deviceDataSchema);
