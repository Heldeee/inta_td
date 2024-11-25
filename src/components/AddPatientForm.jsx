import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPatientForm = ({ onClose, onAddPatient }) => {
    const [formData, setFormData] = useState({
        idNos: '',
        name: '',
        dateOfBirth: '',
        keycloakId: '',
        cabinetId: ''
    });
    const [cabinets, setCabinets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const generateIdNumber = () => {
            setFormData((prevState) => ({
                ...prevState,
                idNos: Math.floor(Math.random() * 1000000).toString()
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

    useEffect(() => {
        const fetchCabinets = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/cabinets');
                setCabinets(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching cabinets data');
                setLoading(false);
            }
        };

        fetchCabinets();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCabinetChange = (e) => {
        const selectedCabinetId = e.target.value;
        setFormData((prevState) => ({
            ...prevState,
            cabinetId: selectedCabinetId
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/patients', formData);
            onAddPatient(response.data);
            setFormData({
                idNos: '',
                name: '',
                dateOfBirth: '',
                keycloakId: '',
                cabinetId: ''
            });
            onClose();
        } catch (error) {
            console.error('Error adding patient:', error);
            alert('Error adding patient');
        }
    };

    if (loading) {
        return <div>Loading cabinets...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
            }}>Add Patient</h2>
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
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc'
                        }}
                    />
                </label>

                <label style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}>
                    Date of Birth:
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc'
                        }}
                    />
                </label>
                <label style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}>
                    Cabinet:
                    <select
                        name="cabinetId"
                        value={formData.cabinetId}
                        onChange={handleCabinetChange}
                        required
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc'
                        }}
                    >
                        <option value="">Select a cabinet</option>
                        {cabinets.map((cabinet) => (
                            <option key={cabinet._id} value={cabinet.idNos}>
                                {cabinet.name}
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
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: 'none',
                            background: '#6c757d',
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

export default AddPatientForm;