import React, { useState } from 'react';
import axios from 'axios';

const AddPatientForm = () => {
    const [formData, setFormData] = useState({
        idNos: '',
        name: '',
        dateOfBirth: '',
        medicalDevices: [
            { id: '', type: '' }
        ]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleMedicalDeviceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMedicalDevices = [...formData.medicalDevices];
        updatedMedicalDevices[index][name] = value;
        setFormData(prevState => ({
            ...prevState,
            medicalDevices: updatedMedicalDevices
        }));
    };

    const addMedicalDevice = () => {
        setFormData(prevState => ({
            ...prevState,
            medicalDevices: [...prevState.medicalDevices, { id: '', type: '' }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/patients', formData);
            alert('Patient added successfully!');
            setFormData({
                idNos: '',
                name: '',
                dateOfBirth: '',
                medicalDevices: [{ id: '', type: '' }]
            });
        } catch (error) {
            console.error('Error adding patient:', error);
            alert('Error adding patient');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                ID Number:
                <input
                    type="text"
                    name="idNos"
                    value={formData.idNos}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Date of Birth:
                <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                />
            </label>

            <h3>Medical Devices</h3>
            {formData.medicalDevices.map((device, index) => (
                <div key={index}>
                    <label>
                        Device ID:
                        <input
                            type="text"
                            name="id"
                            value={device.id}
                            onChange={(e) => handleMedicalDeviceChange(index, e)}
                            required
                        />
                    </label>

                    <label>
                        Device Type:
                        <input
                            type="text"
                            name="type"
                            value={device.type}
                            onChange={(e) => handleMedicalDeviceChange(index, e)}
                            required
                        />
                    </label>
                </div>
            ))}

            <button type="button" onClick={addMedicalDevice}>Add Medical Device</button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddPatientForm;
