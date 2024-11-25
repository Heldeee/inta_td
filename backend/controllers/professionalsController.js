import Professional from '../models/Professional.js';

// Get professional information by ID
export const getProfessionalInfo = async (req, res) => {
    try {
        const professional = await Professional.findOne({ idNos: req.params.id });
        if (!professional) {
            return res.status(404).json({ error: 'Professional not found' });
        }
        res.json(professional);
    } catch (error) {
        console.error('Error fetching professional data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all professionals
export const getAllProfessionals = async (req, res) => {
    try {
        const professionals = await Professional.find();
        res.json(professionals);
    } catch (error) {
        console.error('Error fetching professionals:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};