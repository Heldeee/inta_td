import Observation from '../models/Observation.js';

// Get observation by ID
export const getObservation = async (req, res) => {
    try {
        const observation = await Observation.findById(req.params.id);
        if (!observation) {
            return res.status(404).json({ error: 'Observation not found' });
        }
        res.json(observation);
    } catch (error) {
        console.error('Error fetching observation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get observations by patient ID
export const getObservationsByPatient = async (req, res) => {
    try {
        const observations = await Observation.find({ subject: req.params.patientId });
        res.json(observations);
    } catch (error) {
        console.error('Error fetching observations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all observations
export const getAllObservations = async (req, res) => {
    try {
        const observations = await Observation.find();
        res.json(observations);
    } catch (error) {
        console.error('Error fetching observations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new observation
export const createObservation = async (req, res) => {
    try {
        const newObservation = new Observation(req.body);
        const savedObservation = await newObservation.save();
        res.status(201).json(savedObservation);
    } catch (error) {
        console.error('Error creating observation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update an observation by ID
export const updateObservation = async (req, res) => {
    try {
        const updatedObservation = await Observation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedObservation) {
            return res.status(404).json({ error: 'Observation not found' });
        }
        res.json(updatedObservation);
    } catch (error) {
        console.error('Error updating observation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete an observation by ID
export const deleteObservation = async (req, res) => {
    try {
        const deletedObservation = await Observation.findByIdAndDelete(req.params.id);
        if (!deletedObservation) {
            return res.status(404).json({ error: 'Observation not found' });
        }
        res.json({ message: 'Observation deleted successfully' });
    } catch (error) {
        console.error('Error deleting observation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};