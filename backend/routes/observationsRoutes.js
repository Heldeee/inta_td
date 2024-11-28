
import express from 'express';
const router = express.Router();
import { getObservation, getAllObservations, createObservation, updateObservation, deleteObservation } from '../controllers/observationsController.js';

router.get('/:id', getObservation); // Get specific observation by ID
router.get('/', getAllObservations); // Get all observations
router.post('/', createObservation); // Create a new observation
router.put('/:id', updateObservation); // Update an observation by ID
router.delete('/:id', deleteObservation); // Delete an observation by ID

export default router;