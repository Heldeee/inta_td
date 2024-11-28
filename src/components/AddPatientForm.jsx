import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AddPatientForm.css';

const AddPatientForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        active: true,
        dateOfBirth: '',
        gender: '',
        cabinetId: '',
        keycloakId: '',
        urgentContact: {
            name: '',
            phoneNumber: ''
        },
        telecom: [{
            system: 'phone',
            value: '',
            use: 'home'
        }],
        deceased: false,
        maritalStatus: '',
        photo: '',
        generalPractitioner: ''
    });
    const [cabinets, setCabinets] = useState([]);
    const [practitioners, setPractitioners] = useState([]);
    const [filteredPractitioners, setFilteredPractitioners] = useState([]);
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
        const fetchPractitioners = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/professionals');
                setPractitioners(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching practitioners data');
                setLoading(false);
            }
        };

        fetchPractitioners();
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

    useEffect(() => {
        if (formData.cabinetId) {
            const filtered = practitioners.filter(practitioner => practitioner.cabinetId === formData.cabinetId);
            setFilteredPractitioners(filtered);
        } else {
            setFilteredPractitioners([]);
        }
    }, [formData.cabinetId, practitioners]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Handle nested object fields
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prevState) => ({
                ...prevState,
                [parent]: {
                    ...prevState[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleCabinetChange = (e) => {
        const selectedCabinetId = e.target.value;
        setFormData((prevState) => ({
            ...prevState,
            cabinetId: selectedCabinetId
        }));
    };

    const handlePractitionerChange = (e) => {
        const selectedPractitionerId = e.target.value;
        setFormData((prevState) => ({
            ...prevState,
            generalPractitioner: selectedPractitionerId
        }));
    };

    const handleTelecomChange = (index, field, value) => {
        setFormData(prevState => {
            const newTelecom = [...prevState.telecom];
            newTelecom[index] = {
                ...newTelecom[index],
                [field]: value
            };
            return {
                ...prevState,
                telecom: newTelecom
            };
        });
    };

    const addTelecomEntry = () => {
        setFormData(prevState => ({
            ...prevState,
            telecom: [
                ...prevState.telecom,
                { system: 'phone', value: '', use: 'home' }
            ]
        }));
    };

    const removeTelecomEntry = (index) => {
        setFormData(prevState => ({
            ...prevState,
            telecom: prevState.telecom.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/patients', formData);
            setFormData({
                name: '',
                active: true,
                dateOfBirth: '',
                gender: '',
                cabinetId: '',
                keycloakId: '',
                urgentContact: {
                    name: '',
                    phoneNumber: ''
                },
                telecom: [{
                    system: 'phone',
                    value: '',
                    use: 'home'
                }],
                deceased: false,
                maritalStatus: '',
                photo: '',
                generalPractitioner: ''
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
        <div className="form-container">
            <div className="form-content">
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Active Status</label>
                            <select
                                name="active"
                                className="form-select"
                                value={formData.active}
                                onChange={handleChange}
                            >
                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                className="form-input"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Gender</label>
                            <select
                                name="gender"
                                className="form-select"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Cabinet</label>
                            <select
                                name="cabinetId"
                                className="form-select"
                                value={formData.cabinetId}
                                onChange={handleCabinetChange}
                                required
                            >
                                <option value="">Select Cabinet</option>
                                {cabinets.map(cabinet => (
                                    <option key={cabinet._id} value={cabinet._id}>
                                        {cabinet.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {formData.cabinetId && (
                            <div className="form-group">
                                <label className="form-label">General Practitioner</label>
                                <select
                                    name="generalPractitioner"
                                    className="form-select"
                                    value={formData.generalPractitioner}
                                    onChange={handlePractitionerChange}
                                    required
                                >
                                    <option value="">Select Practitioner</option>
                                    {filteredPractitioners.map(practitioner => (
                                        <option key={practitioner._id} value={practitioner._id}>
                                            {practitioner.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label">Marital Status</label>
                            <select
                                name="maritalStatus"
                                className="form-select"
                                value={formData.maritalStatus}
                                onChange={handleChange}
                            >
                                <option value="">Select Status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                                <option value="separated">Separated</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Deceased</label>
                            <select
                                name="deceased"
                                className="form-select"
                                value={formData.deceased}
                                onChange={handleChange}
                            >
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Photo URL</label>
                            <input
                                type="text"
                                name="photo"
                                className="form-input"
                                value={formData.photo}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="telecom-section">
                        <h3>Contact Methods</h3>
                        {formData.telecom.map((telecom, index) => (
                            <div key={index} className="telecom-entry">
                                <div className="form-group">
                                    <label className="form-label">System</label>
                                    <select
                                        className="form-select"
                                        value={telecom.system}
                                        onChange={(e) => handleTelecomChange(index, 'system', e.target.value)}
                                    >
                                        <option value="phone">Phone</option>
                                        <option value="email">Email</option>
                                        <option value="fax">Fax</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Value</label>
                                    <input
                                        type={telecom.system === 'email' ? 'email' : 'text'}
                                        className="form-input"
                                        value={telecom.value}
                                        onChange={(e) => handleTelecomChange(index, 'value', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Use</label>
                                    <select
                                        className="form-select"
                                        value={telecom.use}
                                        onChange={(e) => handleTelecomChange(index, 'use', e.target.value)}
                                    >
                                        <option value="home">Home</option>
                                        <option value="work">Work</option>
                                        <option value="temp">Temporary</option>
                                        <option value="old">Old</option>
                                        <option value="mobile">Mobile</option>
                                    </select>
                                </div>
                                {formData.telecom.length > 1 && (
                                    <button
                                        type="button"
                                        className="remove-button"
                                        onClick={() => removeTelecomEntry(index)}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            className="add-button"
                            onClick={addTelecomEntry}
                        >
                            Add Contact Method
                        </button>
                    </div>

                    <div className="telecom-container">
                        <h3>Contact Information</h3>
                        <div className="form-group">
                            <label className="form-label">Emergency Contact Name</label>
                            <input
                                type="text"
                                name="urgentContact.name"
                                className="form-input"
                                value={formData.urgentContact.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Emergency Contact Phone</label>
                            <input
                                type="tel"
                                name="urgentContact.phoneNumber"
                                className="form-input"
                                value={formData.urgentContact.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="button-group">
                        <button type="button" onClick={onClose} className="cancel-button">
                            Cancel
                        </button>
                        <button type="submit" className="submit-button">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPatientForm;