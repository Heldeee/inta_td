import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPatientForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        idNos: '',
        name: '',
        dateOfBirth: '',
        medicalDevices: [], // No devices by default
        doctorId: '' // To store the selected doctor's ID
    });

    const [doctors, setDoctors] = useState([]); // To store list of doctors

    useEffect(() => {
        // Fetch doctors from the backend
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/professionals'); // Replace with your API endpoint
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();

        // Generate a random ID number when form loads
        const generateIdNumber = () => {
            setFormData((prevState) => ({
                ...prevState,
                idNos: Math.floor(Math.random() * 1000000).toString() // Example random ID
            }));
        };
        generateIdNumber();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleMedicalDeviceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMedicalDevices = [...formData.medicalDevices];
        updatedMedicalDevices[index][name] = value;
        setFormData((prevState) => ({
            ...prevState,
            medicalDevices: updatedMedicalDevices
        }));
    };

    const addMedicalDevice = () => {
        setFormData((prevState) => ({
            ...prevState,
            medicalDevices: [...prevState.medicalDevices, { id: '', type: '' }] // Add new device
        }));
    };

    const removeMedicalDevice = (index) => {
        const updatedMedicalDevices = formData.medicalDevices.filter((_, i) => i !== index);
        setFormData((prevState) => ({
            ...prevState,
            medicalDevices: updatedMedicalDevices
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add a default device to the form data, linked to the patient and doctor
        const defaultDevice = {
            idNos: formData.idNos, // patient ID
            doctorId: formData.doctorId, // doctor's ID (selected by the secretary)
            type: 'Blood Pressure Monitor' // Example device type
        };

        const updatedFormData = {
            ...formData,
            medicalDevices: [defaultDevice, ...formData.medicalDevices] // Add default device to the list
        };

        try {
            // Send the patient data to the backend (and the associated device)
            await axios.post('http://localhost:5000/api/patients', updatedFormData);
            alert('Patient added successfully!');
            setFormData({
                idNos: '',
                name: '',
                dateOfBirth: '',
                medicalDevices: [], // Reset devices
                doctorId: '' // Reset selected doctor
            });
            onClose(); // Close the modal after submit
        } catch (error) {
            console.error('Error adding patient:', error);
            alert('Error adding patient');
        }
    };

    return (
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
            <h2>Add Patient</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    ID Number:
                    <input type="text" name="idNos" value={formData.idNos} readOnly />
                </label>

                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>

                <label>
                    Date of Birth:
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                </label>

                <label>
                    Select Doctor:
                    <select name="doctorId" value={formData.doctorId} onChange={handleChange} required>
                        <option value="">Select a Doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.idNos} value={doctor.idNos}>
                                {doctor.name} - {doctor.role}
                            </option>
                        ))}
                    </select>
                </label>

                <h3>Medical Devices</h3>
                {formData.medicalDevices.map((device, index) => (
                    <div key={index}>
                        <label>
                            Device ID:
                            <input type="text" name="id" value={device.id} onChange={(e) => handleMedicalDeviceChange(index, e)} required />
                        </label>

                        <label>
                            Device Type:
                            <input type="text" name="type" value={device.type} onChange={(e) => handleMedicalDeviceChange(index, e)} required />
                        </label>

                        <button type="button" onClick={() => removeMedicalDevice(index)}>Remove Device</button>
                    </div>
                ))}

                <button type="button" onClick={addMedicalDevice}>Add Medical Device</button>
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default AddPatientForm;
