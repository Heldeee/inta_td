import express from 'express';
const router = express.Router();
import { getProfessionalInfo, getAllProfessionals } from '../controllers/professionalsController.js';

router.get('/:id', getProfessionalInfo); // Get professional information by ID
router.get('/', getAllProfessionals); // Get all professionals

export default router;
