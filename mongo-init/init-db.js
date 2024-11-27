db.createCollection('professionals');
db.createCollection('patients');
db.createCollection('medicalrecords');
db.createCollection('medicaldevices');
db.createCollection('cabinets');

// Insert cabinets and retrieve their _id fields
const cabinets = db.cabinets.insertMany([
    {
        "name": "Cabinet 1 - Paris",
        "address": "1 rue de Paris, 75001 Paris",
        "phone": "01 23 45 67 89",
    },
    {
        "name": "Cabinet 2 - Lyon",
        "address": "2 rue de Lyon, 69001 Lyon",
        "phone": "04 23 45 67 89",
    },
]);

const cabinet1Id = cabinets.insertedIds[0];
const cabinet2Id = cabinets.insertedIds[1];

// Insert professionals and retrieve their _id fields
const professionals = db.professionals.insertMany([
    {
        "name": "Dr. John Doe",
        "role": "Cardiologist",
        "cabinetId": cabinet1Id,
        "specialization": "Heart Disease"
    },
    {
        "name": "Dr. Jane Smith",
        "role": "Cardiologist",
        "cabinetId": cabinet2Id,
        "specialization": "Heart Disease"
    }
]);

const professional1Id = professionals.insertedIds[0];
const professional2Id = professionals.insertedIds[1];

// Insert patients and retrieve their _id fields
const patients = db.patients.insertMany([
    {
        "name": "Alice Smith",
        "active": true,
        "gender": "female",
        "dateOfBirth": "1990-01-01T00:00:00Z",
        "cabinetId": cabinet1Id,
        "keycloakId": "12345",
        "urgentContact": {
            "name": "Bob Smith",
            "phoneNumber": "123-456-7890"
        },
        "telecom": [
            {
                "system": "phone",
                "value": "123-456-7890",
                "use": "mobile"
            },
            {
                "system": "email",
                "value": "alice.smith@example.com",
                "use": "home"
            }
        ],
        "maritalStatus": "single",
        "photo": "https://example.com/photos/alice.jpg",
        "deceased": false
    },
    {
        "name": "Bob Smith",
        "active": true,
        "gender": "male",
        "cabinetId": cabinet2Id,
        "dateOfBirth": "1990-01-01T00:00:00Z",
        "keycloakId": "12346",
        "urgentContact": {
            "name": "Alice Smith",
            "phoneNumber": "123-456-7890"
        },
        "telecom": [
            {
                "system": "phone",
                "value": "123-456-7890",
                "use": "mobile"
            },
            {
                "system": "email",
                "value": "bob.smith@example.com",
                "use": "home"
            }
        ],
        "maritalStatus": "married",
        "photo": "https://example.com/photos/bob.jpg",
        "deceased": false
    }
]);

const patient1Id = patients.insertedIds[0];
const patient2Id = patients.insertedIds[1];

// Insert medical devices and retrieve their _id fields
const medicalDevices = db.medicaldevices.insertMany([
    {
        "patientId": patient1Id,
        "doctorId": professional1Id,
        "installationDate": "2024-11-11T00:00:00Z"
    },
    {
        "patientId": patient2Id,
        "doctorId": professional2Id,
        "installationDate": "2024-11-11T00:00:00Z"
    }
]);

const device1Id = medicalDevices.insertedIds[0];
const device2Id = medicalDevices.insertedIds[1];

// Insert medical records with deviceId
db.medicalrecords.insertMany([
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T00:00:00Z",
        "bloodPressure": "120/80",
        "heartRate": 75,
        "oxygenSaturation": 98
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T01:00:00Z",
        "bloodPressure": "118/79",
        "heartRate": 74,
        "oxygenSaturation": 97
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T02:00:00Z",
        "bloodPressure": "117/78",
        "heartRate": 72,
        "oxygenSaturation": 96
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T03:00:00Z",
        "bloodPressure": "119/81",
        "heartRate": 73,
        "oxygenSaturation": 98
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T04:00:00Z",
        "bloodPressure": "120/80",
        "heartRate": 70,
        "oxygenSaturation": 99
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T05:00:00Z",
        "bloodPressure": "122/82",
        "heartRate": 72,
        "oxygenSaturation": 97
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T06:00:00Z",
        "bloodPressure": "121/81",
        "heartRate": 73,
        "oxygenSaturation": 96
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T07:00:00Z",
        "bloodPressure": "120/80",
        "heartRate": 71,
        "oxygenSaturation": 98
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T08:00:00Z",
        "bloodPressure": "118/79",
        "heartRate": 72,
        "oxygenSaturation": 97
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T09:00:00Z",
        "bloodPressure": "117/78",
        "heartRate": 70,
        "oxygenSaturation": 96
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T10:00:00Z",
        "bloodPressure": "116/77",
        "heartRate": 71,
        "oxygenSaturation": 98
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T11:00:00Z",
        "bloodPressure": "115/76",
        "heartRate": 69,
        "oxygenSaturation": 99
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T12:00:00Z",
        "bloodPressure": "120/80",
        "heartRate": 72,
        "oxygenSaturation": 98
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T13:00:00Z",
        "bloodPressure": "122/82",
        "heartRate": 74,
        "oxygenSaturation": 97
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T14:00:00Z",
        "bloodPressure": "120/81",
        "heartRate": 71,
        "oxygenSaturation": 96
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T15:00:00Z",
        "bloodPressure": "119/80",
        "heartRate": 73,
        "oxygenSaturation": 98
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T16:00:00Z",
        "bloodPressure": "121/83",
        "heartRate": 75,
        "oxygenSaturation": 97
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T17:00:00Z",
        "bloodPressure": "120/82",
        "heartRate": 74,
        "oxygenSaturation": 96
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T18:00:00Z",
        "bloodPressure": "118/81",
        "heartRate": 72,
        "oxygenSaturation": 97
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-12T00:00:00Z",
        "bloodPressure": "122/80",
        "heartRate": 74,
        "oxygenSaturation": 98
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-12T01:00:00Z",
        "bloodPressure": "120/78",
        "heartRate": 75,
        "oxygenSaturation": 97
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-12T02:00:00Z",
        "bloodPressure": "119/77",
        "heartRate": 72,
        "oxygenSaturation": 98
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-12T03:00:00Z",
        "bloodPressure": "118/76",
        "heartRate": 70,
        "oxygenSaturation": 97
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-12T04:00:00Z",
        "bloodPressure": "120/79",
        "heartRate": 73,
        "oxygenSaturation": 98
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-12T05:00:00Z",
        "bloodPressure": "121/80",
        "heartRate": 74,
        "oxygenSaturation": 99
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-12T06:00:00Z",
        "bloodPressure": "122/81",
        "heartRate": 75,
        "oxygenSaturation": 97
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-12T07:00:00Z",
        "bloodPressure": "121/79",
        "heartRate": 73,
        "oxygenSaturation": 98
    }
]);