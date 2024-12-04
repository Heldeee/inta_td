import React, { useState } from 'react';
import axios from 'axios';

const UploadFHIR = () => {
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(null);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];

        if (!file) {
            setUploadError('Please select a JSON file');
            return;
        }

        if (file.type !== 'application/json') {
            setUploadError('Only JSON files are supported');
            return;
        }

        try {
            const fileContent = await file.text();
            const patientData = JSON.parse(fileContent);

            // Validate required fields (optional, as backend also validates)
            const requiredFields = ['name', 'dateOfBirth', 'gender', 'cabinetId'];
            if (!requiredFields.every((field) => field in patientData)) {
                setUploadError('Missing required fields in JSON');
                return;
            }

            // Upload to backend
            const response = await axios.post('http://localhost:5000/api/patients', patientData);
            if (response.status === 201) {
                setUploadSuccess(`Patient ${patientData.name} created successfully`);
                setUploadError(null);
            } else {
                setUploadError(`Upload failed with status ${response.status}`);
                setUploadSuccess(null);
            }
        } catch (error) {
            console.error('Error uploading patient:', error);
            setUploadError('Error uploading patient. Check console for details.');
            setUploadSuccess(null);
        }
    };

    return (
        <div>
            <label htmlFor="upload-json" className="upload-button">
                Upload FHIR Patient
            </label>
            <input
                id="upload-json"
                type="file"
                accept=".json"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
            />
            {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
            {uploadSuccess && <p style={{ color: 'green' }}>{uploadSuccess}</p>}
        </div>
    );
};

export default UploadFHIR;
