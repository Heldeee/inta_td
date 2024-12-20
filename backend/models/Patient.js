import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: String,
    active: Boolean,
    dateOfBirth: Date,
    gender: String,
    cabinetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cabinet', required: true },
    urgentContact: {
        name: String,
        phoneNumber: String
    },
    telecom: [{
        system: { type: String, enum: ['phone', 'email', 'fax'], required: true },
        value: { type: String, required: true },
        use: { type: String, enum: ['home', 'work', 'temp', 'old', 'mobile'] }
    }],
    deceased: Boolean,
    maritalStatus: { type: String, enum: ['single', 'married', 'divorced', 'widowed', 'separated'] },
    photo: String,
    generalPractitioner: { type: mongoose.Schema.Types.ObjectId, ref: 'Professional' },
    medicalHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Observation' }]
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;