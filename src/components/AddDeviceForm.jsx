import React, { useState, useEffect } from 'react';
import { getPatients } from '../services/patientService';
import { getProfessionals } from '../services/professionalService';
import { addDevice } from '../services/deviceService';

const AddDeviceForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        patientId: '',
        doctorId: '',
        installationDate: ''
    });
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const patientsData = await getPatients();
                const doctorsData = await getProfessionals();
                setPatients(patientsData);
                setDoctors(doctorsData);
                setFilteredPatients(patientsData);
                setFilteredDoctors(doctorsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'patientId') {
            const searchValue = value.toLowerCase();
            setFilteredPatients(patients.filter(patient =>
                patient.name.toLowerCase().includes(searchValue)
            ));
        } else if (name === 'doctorId') {
            const searchValue = value.toLowerCase();
            setFilteredDoctors(doctors.filter(doctor =>
                doctor.name.toLowerCase().includes(searchValue)
            ));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.patientId || !formData.doctorId) {
            alert('Patient ID and Doctor ID are required');
            return;
        }

        const updatedFormData = {
            ...formData,
            type: 'Blood Pressure'
        };

        try {
            await addDevice(updatedFormData);
            alert('Device added successfully!');
            setFormData({
                patientId: '',
                doctorId: '',
                installationDate: ''
            });
            onClose();
        } catch (error) {
            console.error('Error adding device:', error);
            alert('Error adding device');
        }
    };

    return (
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
            <h2>Add Device</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Patient ID:
                    <input
                        type="text"
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleChange}
                        placeholder="Search or enter patient ID"
                        required
                    />
                    <select
                        onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                        value={formData.patientId}
                    >
                        <option value="">Select Patient</option>
                        {filteredPatients.map(patient => (
                            <option key={patient._id} value={patient._id}>
                                {patient.name} - {patient._id}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Doctor ID:
                    <input
                        type="text"
                        name="doctorId"
                        value={formData.doctorId}
                        onChange={handleChange}
                        placeholder="Search or enter doctor ID"
                        required
                    />
                    <select
                        onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                        value={formData.doctorId}
                    >
                        <option value="">Select Doctor</option>
                        {filteredDoctors.map(doctor => (
                            <option key={doctor._id} value={doctor._id}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Installation Date:
                    <input
                        type="date"
                        name="installationDate"
                        value={formData.installationDate}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default AddDeviceForm;
