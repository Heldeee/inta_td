import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { initKeycloak } from './services/keycloakService';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import MedicalRecordForm from './components/MedicalRecordForm';
import DeviceConnectionPage from './components/DeviceConnectionPage';

const App = () => {
  initKeycloak();

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/dashboard">
            <DashboardPage />
          </Route>
          <Route path="/medical-record">
            <MedicalRecordForm />
          </Route>
          <Route path="/device-connection">
            <DeviceConnectionPage />
          </Route>
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;