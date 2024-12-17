import express from 'express';
const router = express.Router();
import { getProfessionalInfo, getAllProfessionals, getProfessionalInfoByKeycloakUsername } from '../controllers/professionalsController.js';

router.get('/keycloak/:username', getProfessionalInfoByKeycloakUsername); // This route must come BEFORE the :id route
router.get('/:id', getProfessionalInfo);
router.get('/', getAllProfessionals);

export default router;
