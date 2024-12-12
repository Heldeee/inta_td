# Medical Cabinet

- React
- Node.js
- Express
- MongoDB
- Keycloak (PostgreSQL)

## Setup

```bash
docker-compose up -d
```

To stop (v flag optional to remove volumes):
```bash
docker-compose down -v
```

## Keycloak

Already setup login for testing purposes:

- doctor1 - password: all logs already setup, direct acess to the dashboard
- doctor2 - password: all logs need to be setup like name etc.
- secretary1 - all logs already setup, direct acess to the dashboard

### Authors

- leo.devin
- phu-hung.dang

## Features

- [x] Login
- [x] Logout
- [x] Dashboard - Doctor - Secretary - Patient
- [x] Doctor
  - [x] See all patients
  - [x] Create patient
  - [x] Transfer patient
    - [x] To FHIR server [Hapi FHIR Base64](https://hapi.fhir.org/baseR4/swagger-ui/?page=Patient)
    - [x] To download resource of a patient
    - [x] Change patient ofc abinet

- [x] Secretary
  - [x] Assign doctor to cabinet
  - [x] See all patients
  - [x] Create patient
  - [x] Transfer patient
    - [x] To download resource of a patient
    - [x] Change patient of cabinet

- [x] Patient
  We chose not to implement a patient dashboard because the patient is not supposed to have access to the application, the patient is supposed to be a resource that the doctor and the secretary can manage.

- [x] Admin
  An admin has access to the configuration file but does not have an specific dashboard or role, it is summon when the cabinet needs it, to create a new doctor or secretary or cabinet.
## Database

The application uses MongoDB to store patient data and Keycloak with PostgreSQL for authentication and authorization.

## Models

### Patient

- `name`: String
- `age`: Number
- `gender`: String
- `address`: String
- `medicalHistory`: Array of medical records

### Doctor

- `name`: String
- `specialization`: String
- `patients`: Array of patient IDs

### Secretary

- `name`: String
- `assignedDoctors`: Array of doctor IDs


## API Endpoints
### Patients
- GET /api/patients: Retrieve a list of all patients.
- GET /api/patients/:id: Retrieve patient data by ID.
- POST /api/patients: Create a new patient.
- GET /api/patients/doctor/:doctorId: Retrieve all patients associated with a specific doctor.
- GET /api/patients/keycloak/:keycloakId: Retrieve patient data by Keycloak ID.
- POST /api/patients/transfer: Send patient data to the FHIR server.
### Cabinets
- GET /api/cabinets: Retrieve a list of all cabinets.
- GET /api/cabinets/:id: Retrieve cabinet data by ID.

## Reponses TD2

1. Ressources FHIR nécessaires :
- Patient : pour les informations démographiques et administratives du patient.
- Practitioner : pour les informations sur les professionnels de santé liés au dossier.
- Encounter : pour les visites ou interactions avec le patient.
- Condition : pour les antécédents médicaux et diagnostics.
- Observation : pour les résultats d’examens ou mesures cliniques (comme les ECG).
- MedicationRequest et MedicationStatement : pour les prescriptions médicamenteuses et traitements suivis.
- DocumentReference : pour les documents attachés au dossier, tels que des comptes-rendus ou rapports d'imagerie.
2. Profils IHE possibles :
- PDQm (Patient Demographics Query for Mobile) : pour rechercher et échanger les données démographiques des patients.
- XDS.b (Cross-Enterprise Document Sharing) : pour le partage de documents médicaux entre organisations.
- MHD (Mobile Access to Health Documents) : pour accéder à des documents cliniques de manière mobile.

![](https://mermaid.ink/img/pako:eNqFV21v6jYU_itRJsSd5FuREALkwyRKaFcVCgNupS2gySQGIkKMkrC7DvjvsxPbMXlp8wXs8xyf9-Pji-piD6mW2mhc_NBPLOXSTPboiJqW0vRgdGgCJdt4h5EPNwGKCeWiNAM_REMc4KhpNTcBdA_N2-3WaKzCXQRPe2Vpr0KFfI2GMoF-qMQo-sd3UazESXR2k3OEMnp83mQMK_UpwmGCQk9ZZFjF6mjd9krNgPR7mk_flo7ADU6ndU4kkgTFxccTDlGYxDldkjTMydLp9BtOJ7O_B7btDDxvBhOfYJ5wdFxXocaj-dIZBChK4rEfJ1UYe7D43bFhvN9gGJEDd6gSNXp3bERNHuIwRG7i47AOO54-v7w5Y7zzayGTke1MkOe7MJgjF0denQUEOB8N77G1pswGS4d55CXcYglCHF4dBR7zyhgsOLEQgcX7MHWIlzqEodZlzOvoT-eAPtwAw0M9ivriKNtXD6UGnjIDyyBhY_qnlLqPJP_vM7fVasmWPQ6Grw5HlfKWhD2JcEBSqS5fc3oxYZfzseSvOIeuK4Ald3yBl3zyFXI-fXJOEd6iOCbpC4NqfDFXJqT5BNVGM1LB3snUlurFhglclwGlCqjASPlcRaXmzCRzPrFhjs9JTZIzUsGG-fTHciQHLYOtq1DliH0ClsP1GawUqxL4i3ynft_AGClVVTyZvj1PnW8THO6w_ahYereldX-VDp9NF8vn-WjhfJvhONlFaPHHmJSM0dY5qlrq4JzsuURZIG0Fr6wVKFZP67XKx2RVxpprrGxQ8hOhsNCi0vtF-f79t-tg9qIQlwfxNS3dEplocqVyMwKFpPvUL9fMAQVKgYP8kRi4QyRlRRP1yU9EYkTuNKF-hmKdkut7Fb0gJ5PsKZDJTk4m-VIgk52czJWUdBf68V5Wrx7XJj3iR4ziKy9eic4VzOlCQa5PgS40FG2nCCBbXFFRaSkmy3IlwUVXiVKrhAmNRJFVwoRieZFV4yT9iCMXyQcZpXbZ2g1gHNtoy_NS2fpBYP2iux29pwMyOuEDEkuXTl_Wz72foAK3GH84_7bX6cCcP1t-xs9bNzvA7bRb7ZY4gC3rDzjS3s14zY1huprgZct63oj6i_F6nrnRc7lsWc_r8b6UsXcNQ9dydrasZ4e0wTCX9TrIzLVmyztWiTlrDSCtdhY6mcqnSpAPjkDMh4DPgCAf8ACfz4A0qAE-h-XxvRPCUhrwpAU8LUFeKnlkZVZWl4DVH2B1Bng5ZfGUOURhAVE7QJQHkCogjea9LNIcAe94ImIyhPYdGgoVqEcUHaHvkffJhSJWavoUWakW-UtfJ_QauBEcgePFR-iqFnleIKASsbu9am3J3UZW5xMRg2wfkpvkyCEnGP6FsbxUrYv6r2ppxoNmaj2zb5iaqZudHlA_6K7x0Nd7bU3vt9uGYWj6Daj_pQdoD2ar1W9326ZpkMrqd7pAJVd2gqNJ9rZKn1i3_wEUxQ6z)
