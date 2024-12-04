import express from 'express';
const router = express.Router();
import {
    getEncounter,
    getAllEncounters,
    createEncounter,
    updateEncounter,
    deleteEncounter,
    getEncountersByPatient
} from '../controllers/encountersController.js';

router.get('/patient/:patientId', getEncountersByPatient); // Get specific encounter by patient ID
router.get('/:id', getEncounter); // Get specific encounter by ID
router.get('/', getAllEncounters); // Get all encounters
router.post('/', createEncounter); // Create a new encounter
router.put('/:id', updateEncounter); // Update an encounter by ID
router.delete('/:id', deleteEncounter); // Delete an encounter by ID

export default router;