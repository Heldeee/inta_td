import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransferPatientForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        patientId: '',
        doctorId: ''
    });
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const patientsResponse = await axios.get('http://localhost:5000/api/patients');
                const doctorsResponse = await axios.get('http://localhost:5000/api/professionals');
                setPatients(patientsResponse.data);
                setDoctors(doctorsResponse.data);
                setFilteredPatients(patientsResponse.data);
                setFilteredDoctors(doctorsResponse.data);
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
            alert('Both Patient and Doctor must be selected.');
            return;
        }

        try {
            console.log('Transferring patient:', formData);
            // Placeholder for FHIR format and backend call
            alert('Patient transfer recorded successfully!');
            setFormData({ patientId: '', doctorId: '' });
            onClose();
        } catch (error) {
            console.error('Error transferring patient:', error);
            alert('Error transferring patient.');
        }
    };

    return (
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
            <h2>Transfer Patient</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Patient:
                    <input
                        type="text"
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleChange}
                        placeholder="Search or select patient"
                    />
                    <select
                        onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                        value={formData.patientId}
                    >
                        <option value="">Select Patient</option>
                        {filteredPatients.map(patient => (
                            <option key={patient._id} value={patient._id}>
                                {patient.name} - {patient.idNos}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Select Doctor:
                    <input
                        type="text"
                        name="doctorId"
                        value={formData.doctorId}
                        onChange={handleChange}
                        placeholder="Search or select doctor"
                    />
                    <select
                        onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                        value={formData.doctorId}
                    >
                        <option value="">Select Doctor</option>
                        {filteredDoctors.map(doctor => (
                            <option key={doctor._id} value={doctor._id}>
                                {doctor.name} - {doctor.specialization}
                            </option>
                        ))}
                    </select>
                </label>

                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default TransferPatientForm;
