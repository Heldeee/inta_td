
import Encounter from '../models/Encounter.js';

// Get encounter by ID
export const getEncounter = async (req, res) => {
    try {
        const encounter = await Encounter.findById(req.params.id);
        if (!encounter) {
            return res.status(404).json({ error: 'Encounter not found' });
        }
        res.json(encounter);
    } catch (error) {
        console.error('Error fetching encounter:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all encounters
export const getAllEncounters = async (req, res) => {
    try {
        const encounters = await Encounter.find();
        res.json(encounters);
    } catch (error) {
        console.error('Error fetching encounters:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new encounter
export const createEncounter = async (req, res) => {
    try {
        const newEncounter = new Encounter(req.body);
        const savedEncounter = await newEncounter.save();
        res.status(201).json(savedEncounter);
    } catch (error) {
        console.error('Error creating encounter:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update an encounter by ID
export const updateEncounter = async (req, res) => {
    try {
        const updatedEncounter = await Encounter.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEncounter) {
            return res.status(404).json({ error: 'Encounter not found' });
        }
        res.json(updatedEncounter);
    } catch (error) {
        console.error('Error updating encounter:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete an encounter by ID
export const deleteEncounter = async (req, res) => {
    try {
        const deletedEncounter = await Encounter.findByIdAndDelete(req.params.id);
        if (!deletedEncounter) {
            return res.status(404).json({ error: 'Encounter not found' });
        }
        res.json({ message: 'Encounter deleted successfully' });
    } catch (error) {
        console.error('Error deleting encounter:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};