const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const patientRoutes = require('./routes/patientsRoutes');
const deviceRoutes = require('./routes/devicesRoutes');
const medicalRecordRoutes = require('./routes/medicalRecordsRoutes');
const professionalRoutes = require('./routes/professionalsRoutes');

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/professionals', professionalRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
