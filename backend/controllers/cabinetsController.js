import Cabinet from '../models/Cabinet.js';

// Get cabinet data by ID
export const getCabinetInfo = async (req, res) => {
    try {
        const cabinet = await Cabinet.findOne({ idNos: req.params.id });
        if (!cabinet) {
            return res.status(404).json({ error: 'Cabinet not found' });
        }
        res.json(cabinet);
    } catch (error) {
        console.error('Error fetching cabinet data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get list of all cabinets
export const getAllCabinets = async (req, res) => {
    try {
        const cabinets = await Cabinet.find();
        res.json(cabinets);
    } catch (error) {
        console.error('Error fetching cabinets list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};