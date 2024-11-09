const express = require('express');
const router = express.Router();
const { getProfessionalInfo } = require('../controllers/professionalsController');

router.get('/:id', getProfessionalInfo); // Get professional information by ID

module.exports = router;
