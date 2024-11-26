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
        try {
            await axios.post('http://localhost:5000/api/patients/transfer', formData);
            alert('Patient transferred successfully');
            onClose();
        } catch (error) {
            console.error('Error transferring patient:', error);
            alert('Error transferring patient');
        }
    };

    return (
        <div style={{
            background: '#f9f9f9',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            maxWidth: '500px',
            margin: '0 auto'
        }}>
            <h2 style={{
                marginBottom: '20px',
                color: '#333',
                textAlign: 'center'
            }}>Transfer Patient</h2>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <label style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}>
                    Patient:
                    <input
                        type="text"
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleChange}
                        required
                        placeholder="Search patient by name"
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc'
                        }}
                    />
                    <select
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleChange}
                        required
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc'
                        }}
                    >
                        <option value="">Select a patient</option>
                        {filteredPatients.map((patient) => (
                            <option key={patient._id} value={patient._id}>
                                {patient.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}>
                    Doctor:
                    <input
                        type="text"
                        name="doctorId"
                        value={formData.doctorId}
                        onChange={handleChange}
                        required
                        placeholder="Search doctor by name"
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc'
                        }}
                    />
                    <select
                        name="doctorId"
                        value={formData.doctorId}
                        onChange={handleChange}
                        required
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc'
                        }}
                    >
                        <option value="">Select a doctor</option>
                        {filteredDoctors.map((doctor) => (
                            <option key={doctor._id} value={doctor._id}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                </label>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '20px'
                }}>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: 'none',
                            background: '#007BFF',
                            color: '#fff',
                            cursor: 'pointer'
                        }}
                    >
                        Transfer
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: 'none',
                            background: '#dc3545',
                            color: '#fff',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TransferPatientForm;