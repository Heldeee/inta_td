import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPatientForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        idNos: '',
        name: '',
        dateOfBirth: '',
        medicalDevices: [] // No devices by default
    });

    useEffect(() => {
        // Generate a random ID number when form loads
        const generateIdNumber = () => {
            setFormData((prevState) => ({
                ...prevState,
                idNos: Math.floor(Math.random() * 1000000).toString() // example random ID
            }));
        };
        generateIdNumber();

        const generateAlphaNumericId = (length = 10) => {
            const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            setFormData((prevState) => ({
                ...prevState,
                keycloakId: result
            }));
        };

        generateAlphaNumericId();
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

        try {
            await axios.post('http://localhost:5000/api/patients', formData);
            alert('Patient added successfully!');
            setFormData({
                idNos: '',
                name: '',
                dateOfBirth: '',
                medicalDevices: [], // Reset devices
                medicalRecords: [], // Reset records
                keycloakId: ''
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
