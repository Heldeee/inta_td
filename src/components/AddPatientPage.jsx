
import React from 'react';
import AddPatientForm from './AddPatientForm';
import '../styles/AddPatientPage.css';

const AddPatientPage = () => {
    return (
        <div className="add-patient-page">
            <h1>Add New Patient</h1>
            <AddPatientForm onClose={() => window.history.back()} />
        </div>
    );
};

export default AddPatientPage;