import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initKeycloak, isAuthenticated } from './services/keycloakService';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import MedicalRecordForm from './components/MedicalRecordForm';
import DeviceConnectionPage from './components/DeviceConnectionPage';

const App = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initKeycloak();
        setInitialized(true);
      } catch (error) {
        console.error('Failed to initialize Keycloak', error);
      }
    };
    init();
  }, []);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated() ? <Navigate to="/dashboard" /> : <LoginPage />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated() ? <DashboardPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/medical-record"
            element={isAuthenticated() ? <MedicalRecordForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/device-connection"
            element={isAuthenticated() ? <DeviceConnectionPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;