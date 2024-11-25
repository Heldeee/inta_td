import express from 'express';
const router = express.Router();
import { getCabinetInfo, getAllCabinets } from '../controllers/cabinetsController.js';

router.get('/:id', getCabinetInfo); // Get specific cabinet by ID
router.get('/', getAllCabinets); // Get all cabinets

export default router;