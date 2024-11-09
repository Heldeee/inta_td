import React, { useEffect, useState } from 'react';

const DeviceStatusPanel = () => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDeviceData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/devices'); // Update this to your actual API URL
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }
                const data = await response.json();
                setDevices(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDeviceData();
    }, []);

    if (loading) return <p>Loading devices...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Device Status Panel</h2>
            {devices.length === 0 ? (
                <p>No devices connected.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {devices.map(device => (
                        <li key={device.id} style={{
                            padding: '10px', marginBottom: '10px', borderRadius: '4px',
                            backgroundColor: device.status === "Connected" ? '#e0f7e9' : '#f8d7da',
                            color: device.status === "Connected" ? '#2e7d32' : '#a94442'
                        }}>
                            <strong>{device.name}</strong> - {device.status}
                            <div style={{ fontSize: '0.8em', color: '#777' }}>Last updated: {device.lastUpdated}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DeviceStatusPanel;
