import React, { useState } from 'react';

const DeviceConnectionPage = () => {
    const [deviceId, setDeviceId] = useState('');

    const handleConnect = () => {
        // Connecter le dispositif médical du patient
        console.log('Connecting device:', deviceId);
    };

    return (
        <div>
            <h1>Connect Medical Device</h1>
            <div>
                <label htmlFor="deviceId">Device ID:</label>
                <input
                    type="text"
                    id="deviceId"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                />
            </div>
            <button onClick={handleConnect}>Connect</button>
        </div>
    );
};

export default DeviceConnectionPage;