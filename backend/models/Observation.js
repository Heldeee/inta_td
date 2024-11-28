import mongoose from 'mongoose';

const observationSchema = new mongoose.Schema({
    identifier: [{ type: String }], // Business Identifier for observation
    status: { type: String, required: true },
    category: [{ type: String }],
    code: { type: String, required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    encounter: { type: mongoose.Schema.Types.ObjectId, ref: 'Encounter' },
    effectiveDateTime: Date,
    issued: Date,
    performer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Professional' }],
    valueString: String,
    valueBoolean: Boolean,
    valueInteger: Number,
    valueDateTime: Date,
    interpretation: [{ type: String }],
    note: [{ type: String }],
    bodySite: String,
    method: String,
    device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
    referenceRange: [{
        low: Number,
        high: Number,
        type: String,
        appliesTo: [{ type: String }],
        age: { type: String },
        text: String
    }],
    component: [{
        code: { type: String, required: true },
        valueString: String,
        valueBoolean: Boolean,
        valueInteger: Number,
        valueDateTime: Date,
        interpretation: [{ type: String }]
    }]
});

const Observation = mongoose.model('Observation', observationSchema);
export default Observation;