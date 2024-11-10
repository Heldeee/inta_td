# Medical Cabinet Management System

## Overview

The Medical Cabinet Management System is a secure and scalable web application designed for managing medical records, device data, and patient information in a healthcare setting. The system ensures secure interoperability, including the management of patient data, medical records, and connected medical devices, while adhering to interoperability standards like MOS and NOS. It is built using React, MongoDB, PostgreSQL, Keycloak for authentication, and Docker for containerization.

## Features

- Patient and Medical Records Management: Secure storage and retrieval of patient medical records, including ECG data from connected devices.
- Doctor and Medical Device Management: Secure access for doctors to view patient records and manage medical devices.
- Authentication & Authorization: Role-based access control using Keycloak, ensuring secure login and data access.
- MongoDB Integration: Store patient, medical record, and device data securely in MongoDB.
- Frontend Interface: A user-friendly interface for patient data entry, medical record consultation, and device management.

## Requirements
### Prerequisites
- Docker: For containerized deployment of all services.
- Docker Compose: To manage multi-container setups.

### Technology Stack
- Frontend: React
- Backend: Node.js
- Database: MongoDB and PostgreSQL
- Authentication: Keycloak
- Containerization: Docker and Docker Compose

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/heldeee/inta_td.git
cd medical-cabinet-management
```

2. Setup Docker Environment:

Make sure you have Docker and Docker Compose installed. If not, follow the installation guides:

[Docker Installation](https://docs.docker.com/engine/install/)
[Docker Compose Installation](https://docs.docker.com/compose/install/)

3. Configuration

#### Frontend
The frontend React application is located in the frontend directory. It communicates with the `backend` to manage and display patient, medical record, and device data.

#### Backend
The backend is built with Node.js and handles API requests, authentication via Keycloak, and MongoDB data interactions. It is located in the `backend` directory.

#### MongoDB and PostgreSQL
Both databases are configured and run as Docker services. Configuration files for these services are included in the `docker-compose.yml`.

#### Keycloak
Keycloak is configured to handle user authentication and authorization. Default credentials are set in the `docker-compose.yml`.

4. Docker Compose Configuration
To set up the entire system using Docker, use the provided docker-compose.yml file. This will set up the following services:

- Frontend (React)
- Backend (Node.js)
- MongoDB (Database for patient and medical records)
- PostgreSQL (Database for additional functionalities)
- Keycloak (Authentication and authorization)

Run the following command to bring up the entire system:

```bash
docker-compose up --build
```

This command will start all the necessary services. After the containers are up, the system will be accessible as follows:

- Frontend: `http://localhost:5173`
- Backend:`http://localhost:3000`
- Keycloak: `http://localhost:8080`
- MongoDB: `mongodb://localhost:27017`
- PostgreSQL: `postgres://localhost:5432`

5. Access Keycloak Admin Console
After running the docker-compose command, you can access Keycloak's Admin Console at: `http://localhost:8081`

Default credentials are:

- Username: `admin`
- Password: `admin`

6. Authentication Setup
Once logged in to Keycloak, you can configure users, roles, and client applications to manage the access control for the system.

7. Database Configuration
MongoDB is used for storing patient records, and PostgreSQL is used for additional data management. Make sure the backend connects to these databases by adjusting the connection strings in the environment configuration (create `.env` or environment variables in Docker Compose).

Usage
1. Access the Application
- Frontend: Open your browser and go to http://localhost:5173 to access the React frontend interface.
- Keycloak: Manage user authentication and roles at http://localhost:8080.
2. Managing Patient Data
- Add, update, and view patient information and medical records through the frontend interface.
- Doctors can access patient records and medical data from connected devices.
3. Managing Medical Devices
- Devices can be registered and linked to specific patients.
- Data from devices (e.g., ECG readings) can be retrieved and stored in the MongoDB database.
