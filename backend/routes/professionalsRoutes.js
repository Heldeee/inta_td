import express from 'express';
const router = express.Router();
import { getProfessionalInfo } from '../controllers/professionalsController.js';

router.get('/:id', getProfessionalInfo); // Get professional information by ID

export default router;
