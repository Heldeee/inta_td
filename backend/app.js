import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import patientRoutes from './routes/patientsRoutes.js';
import deviceRoutes from './routes/devicesRoutes.js';
import medicalRecordRoutes from './routes/medicalRecordsRoutes.js';
import professionalRoutes from './routes/professionalsRoutes.js';
import cabinetsRoutes from './routes/cabinetsRoutes.js';
import observationsRoutes from './routes/observationsRoutes.js';
import encountersRoutes from './routes/encountersRoutes.js';

dotenv.config();

const app = express();
const uri = `mongodb://mongodb:27017/medical_cabinet`

console.log(uri);

app.use(express.json());
app.use(cors())

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/medicalrecords', medicalRecordRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api/cabinets', cabinetsRoutes);
app.use('/api/observations', observationsRoutes);
app.use('/api/encounters', encountersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
