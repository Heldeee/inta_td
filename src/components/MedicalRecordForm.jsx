import React, { useState } from 'react';

const MedicalRecordForm = () => {
    const [bloodPressure, setBloodPressure] = useState({ systolic: 0, diastolic: 0 });
    const [heartRate, setHeartRate] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting medical record:', { bloodPressure, heartRate });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Medical Record</h2>
            <div>
                <label htmlFor="systolic">Systolic Blood Pressure:</label>
                <input
                    type="number"
                    id="systolic"
                    value={bloodPressure.systolic}
                    onChange={(e) => setBloodPressure({ ...bloodPressure, systolic: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="diastolic">Diastolic Blood Pressure:</label>
                <input
                    type="number"
                    id="diastolic"
                    value={bloodPressure.diastolic}
                    onChange={(e) => setBloodPressure({ ...bloodPressure, diastolic: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="heartRate">Heart Rate:</label>
                <input
                    type="number"
                    id="heartRate"
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default MedicalRecordForm;