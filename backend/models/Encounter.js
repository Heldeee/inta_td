import mongoose from 'mongoose';

const encounterSchema = new mongoose.Schema({
    status: { type: String, required: true },
    class: { type: String, required: true },
    type: [{ type: String }],
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    participant: [{
        individual: { type: mongoose.Schema.Types.ObjectId, ref: 'Professional' },
        period: { start: Date, end: Date }
    }],
    period: { start: Date, end: Date },
    reasonCode: [{ type: String }],
    diagnosis: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Observation' }],
    serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'Cabinet' }
});

const Encounter = mongoose.model('Encounter', encounterSchema);
export default Encounter;