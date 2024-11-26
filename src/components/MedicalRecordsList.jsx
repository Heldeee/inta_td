import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const MedicalRecordsList = () => {
    const [patients, setPatients] = useState([]);
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [searchIdNos, setSearchIdNos] = useState('');
    const [selectedPatientIdNos, setSelectedPatientIdNos] = useState('');
    const [showPatientList, setShowPatientList] = useState(false);
    const [selectedDate, setSelectedDate] = useState('2024-11-11'); // Default date to 11/11/2024
    const [loading, setLoading] = useState(false);

    // Fetch all patients on component mount
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/patients');
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);

    // Fetch medical records for the selected patient
    const fetchMedicalRecords = useCallback(async () => {
        if (selectedPatientIdNos && !loading) {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/medicalRecords/${selectedPatientIdNos}`);
                setRecords(response.data);
                setFilteredRecords(response.data); // Initially, all records are shown
            } catch (error) {
                console.error('Error fetching medical records:', error);
            } finally {
                setLoading(false);
            }
        }
    }, [selectedPatientIdNos, loading]);

    // Trigger initial medical record fetch when patient is selected
    useEffect(() => {
        if (selectedPatientIdNos) {
            fetchMedicalRecords();
        }
    }, [selectedPatientIdNos, fetchMedicalRecords]);

    // Handle search bar input change
    const handleSearchChange = (e) => {
        setSearchIdNos(e.target.value);
        setShowPatientList(true);
    };

    // Handle patient selection from search results
    const handlePatientSelect = (patient) => {
        setSelectedPatientIdNos(patient.idNos);
        setSearchIdNos(patient.name);
        setShowPatientList(false);
    };

    // Handle date selection and filter records
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);

        // Filter records based on the selected date
        const filtered = records.filter(record => {
            const recordDate = new Date(record.recordDate).toLocaleDateString();
            return recordDate === selectedDate;
        });

        if (filtered.length === 0) {
            setFilteredRecords([]); // Clear the records if no records match the selected date
        } else {
            setFilteredRecords(filtered);
        }
    };

    return (
        <div style={{ marginBottom: '100px' }}>
            <h2>Medical Records</h2>

            {/* Search and select a patient */}
            <input
                type="text"
                placeholder="Search by Patient Name or IDNos"
                value={searchIdNos}
                onChange={handleSearchChange}
                onClick={() => setShowPatientList(true)}
                style={{ padding: '8px', marginBottom: '10px', width: '100%' }}
            />
            {showPatientList && (
                <ul style={{ border: '1px solid #ccc', padding: '8px', listStyleType: 'none', marginTop: '5px', maxHeight: '200px', overflowY: 'auto' }}>
                    {patients.map(patient => (
                        <li
                            key={patient.idNos}
                            onClick={() => handlePatientSelect(patient)}
                            style={{ cursor: 'pointer', padding: '4px 0' }}
                        >
                            {patient.name} ({patient.idNos})
                        </li>
                    ))}
                </ul>
            )}

            {/* Date picker */}
            <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                style={{ padding: '8px', marginBottom: '10px', width: '100%' }}
            />

            {/* Medical Records Table */}
            {filteredRecords.length > 0 ? (
                <div style={{ marginTop: '20px', height: '400px', overflowY: 'auto' }}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Blood Pressure</th>
                                <th>Heart Rate</th>
                                <th>Oxygen Saturation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map((record, index) => (
                                <tr key={index}>
                                    <td>{new Date(record.recordDate).toLocaleString()}</td>
                                    <td>{record.bloodPressure}</td>
                                    <td>{record.heartRate}</td>
                                    <td>{record.oxygenSaturation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>No medical records found for this patient on the selected date.</div>
            )}
        </div>
    );
};

export default MedicalRecordsList;