import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MedicalRecordsList.css'; // Import the CSS file

const MedicalRecordsList = () => {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/devices');
                setDevices(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching devices data');
                setLoading(false);
            }
        };

        fetchDevices();
    }, []);

    const handleDeviceSelect = async (deviceId) => {
        setSelectedDevice(deviceId);
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/medicalrecords/${deviceId}`);
            setRecords(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching medical records');
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Medical Devices</h2>
            <select onChange={(e) => handleDeviceSelect(e.target.value)} value={selectedDevice || ''}>
                <option value="" disabled>Select a device</option>
                {devices.map((device) => (
                    <option key={device._id} value={device._id}>
                        {device.patientId.name} - {device.type}
                    </option>
                ))}
            </select>

            {selectedDevice && (
                <div>
                    <h3>Medical Records for Device {selectedDevice}</h3>
                    {records.length === 0 ? (
                        <p>No records found for this device.</p>
                    ) : (
                        <div className="records-container">
                            <table className="records-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Blood Pressure</th>
                                        <th>Heart Rate</th>
                                        <th>Oxygen Saturation</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.map((record) => (
                                        <tr key={record._id}>
                                            <td>{new Date(record.recordDate).toLocaleString()}</td>
                                            <td>{record.bloodPressure}</td>
                                            <td>{record.heartRate}</td>
                                            <td>{record.oxygenSaturation}</td>
                                            <td>{record.notes}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MedicalRecordsList;