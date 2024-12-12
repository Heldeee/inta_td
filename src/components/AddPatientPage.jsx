import React, { useState } from 'react';
import { Upload, FileJson } from 'lucide-react'; // Add FileJson import
import AddPatientForm from './AddPatientForm';
import '../styles/AddPatientPage.css';

const AddPatientPage = () => {
    const [jsonData, setJsonData] = useState(null);
    const [fileName, setFileName] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setUploadStatus('uploading');
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    setJsonData(data);
                    setUploadStatus('success');
                } catch (error) {
                    setUploadStatus('error');
                    alert('Invalid JSON file');
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="add-patient-page">
            <div className="page-header">
                <h1>Add New Patient</h1>
                <div className="upload-section">
                    <label className={`json-upload-button ${uploadStatus}`}>
                        <FileJson size={24} className="json-icon" />
                        <div className="upload-text">
                            <span className="upload-title">
                                {fileName || 'Import from JSON'}
                            </span>
                            <span className="upload-subtitle">
                                {uploadStatus === 'success' ? 'File loaded' : 'Click to browse'}
                            </span>
                        </div>
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                        />
                    </label>
                </div>
            </div>
            <AddPatientForm onClose={() => window.history.back()} initialData={jsonData} />
        </div>
    );
};

export default AddPatientPage;