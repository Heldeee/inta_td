const express = require('express');
const router = express.Router();
const { getPatientInfo, getAllPatients } = require('../controllers/patientsController');

router.get('/:id', getPatientInfo); // Get specific patient by ID
router.get('/', getAllPatients); // Get all patients

module.exports = router;
