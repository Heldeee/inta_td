import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPatientForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        idNos: '',
        name: '',
        dateOfBirth: '',
        keycloakId: ''
    });

    useEffect(() => {
        // Generate a random ID number and alphanumeric keycloakId when form loads
        const generateIdNumber = () => {
            setFormData((prevState) => ({
                ...prevState,
                idNos: Math.floor(Math.random() * 1000000).toString() // example random ID
            }));
        };

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

        generateIdNumber();
        generateAlphaNumericId();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
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
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>

                <label>
                    Date of Birth:
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                </label>

                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default AddPatientForm;
