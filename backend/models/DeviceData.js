import mongoose from 'mongoose';

const deviceDataSchema = new mongoose.Schema({
    patientId: { type: String, required: true },
    deviceId: { type: String, required: true },
    timestamp: Date,
    data: Object
});

const DeviceData = mongoose.model('DeviceData', deviceDataSchema);
export default DeviceData;
