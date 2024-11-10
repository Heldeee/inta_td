import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import patientRoutes from './routes/patientsRoutes.js';
import deviceRoutes from './routes/devicesRoutes.js';
import medicalRecordRoutes from './routes/medicalRecordsRoutes.js';
import professionalRoutes from './routes/professionalsRoutes.js';

dotenv.config();

const app = express();

const uri = process.env.MONGODB_URI;

console.log(uri);

app.use(express.json());

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/professionals', professionalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
