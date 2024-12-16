import React, { useState, useEffect } from 'react';
import { getDevices, getDevice, getDeviceRecords } from '../services/medicalRecordService';
import '../styles/MedicalRecordsList.css'; // Import the CSS file

const MedicalRecordsList = () => {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const prettyPrintDate = (date) => {
        return new Date(date).toLocaleString();
    };

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const data = await getDevices();
                setDevices(data);
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
            const deviceData = await getDevice(deviceId);
            setRecords(deviceData);
            try {
                const recordsData = await getDeviceRecords(deviceId);
                // Handle records data as needed
            } catch (error) {
                setError('Error fetching medical records');
                setLoading(false);
            }
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
                        {device.patientId.name} - {device._id} - {prettyPrintDate(device.installationDate)}
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