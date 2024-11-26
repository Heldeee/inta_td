db.createCollection('professionals');
db.createCollection('patients');
db.createCollection('medicalrecords');
db.createCollection('medicaldevices');
db.createCollection('cabinets');

// Création des index
db.professionals.createIndex({ "idNos": 1 }, { unique: true });
db.patients.createIndex({ "idNos": 1 }, { unique: true });
db.medicalrecords.createIndex({ "patientId": 1 });
db.medicaldevices.createIndex({ "patientId": 1, "timestamp": 1 });
db.cabinets.createIndex({ "idNos": 1 }, { unique: true });


//insert cabinet
db.cabinets.insertMany([
    {
        "idNos": "1",
        "name": "Cabinet 1 - Paris",
        "address": "1 rue de Paris, 75001 Paris",
        "phone": "01 23 45 67 89",
    },
    {
        "idNos": "2",
        "name": "Cabinet 2 - Lyon",
        "address": "2 rue de Lyon, 69001 Lyon",
        "phone": "04 23 45 67 89",
    },
]);

// Insertion des nomenclatures NOS
db.nos_nomenclatures.insertMany([
    {
        "id": "1.2.250.1.213.3.3.11/934",
        "name": "Prise de tension en continu en ambulatoire",
        "type": "medical_act"
    },
    {
        "id": "1.2.250.1.213.3.3.11/520",
        "name": "Hypertension artérielle",
        "type": "diagnosis"
    }
]);

db.professionals.insertMany([
    {
        "idNos": "12345",
        "name": "Dr. John Doe",
        "role": "Cardiologist",
        "cabinetId": "1",
        "specialization": "Heart Disease"
    },
    {
        "idNos": "12346",
        "name": "Dr. Jane Smith",
        "role": "Cardiologist",
        "cabinetId": "2",
        "specialization": "Heart Disease"
    }
]);

db.patients.insertMany([
    {
        "idNos": "26218",
        "name": "Alice Smith",
        "gender": "female",
        "dateOfBirth": "1990-01-01T00:00:00Z",
        "cabinetId": "1",
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
        "active": true,
        "deceased": false
    },
    {
        "idNos": "26219",
        "name": "Bob Smith",
        "gender": "male",
        "cabinetId": "2",
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
        "active": true,
        "deceased": false
    }
]);

db.medicalrecords.insertMany([
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T00:00:00Z",
        "bloodPressure": "120/80",
        "heartRate": 75,
        "oxygenSaturation": 98
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T01:00:00Z",
        "bloodPressure": "118/79",
        "heartRate": 74,
        "oxygenSaturation": 97
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T02:00:00Z",
        "bloodPressure": "117/78",
        "heartRate": 72,
        "oxygenSaturation": 96
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T03:00:00Z",
        "bloodPressure": "119/81",
        "heartRate": 73,
        "oxygenSaturation": 98
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T04:00:00Z",
        "bloodPressure": "120/80",
        "heartRate": 70,
        "oxygenSaturation": 99
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T05:00:00Z",
        "bloodPressure": "122/82",
        "heartRate": 72,
        "oxygenSaturation": 97
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T06:00:00Z",
        "bloodPressure": "121/81",
        "heartRate": 73,
        "oxygenSaturation": 96
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T07:00:00Z",
        "bloodPressure": "120/80",
        "heartRate": 71,
        "oxygenSaturation": 98
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T08:00:00Z",
        "bloodPressure": "118/79",
        "heartRate": 72,
        "oxygenSaturation": 97
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T09:00:00Z",
        "bloodPressure": "117/78",
        "heartRate": 70,
        "oxygenSaturation": 96
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T10:00:00Z",
        "bloodPressure": "116/77",
        "heartRate": 71,
        "oxygenSaturation": 98
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T11:00:00Z",
        "bloodPressure": "115/76",
        "heartRate": 69,
        "oxygenSaturation": 99
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T12:00:00Z",
        "bloodPressure": "120/80",
        "heartRate": 72,
        "oxygenSaturation": 98
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T13:00:00Z",
        "bloodPressure": "122/82",
        "heartRate": 74,
        "oxygenSaturation": 97
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T14:00:00Z",
        "bloodPressure": "120/81",
        "heartRate": 71,
        "oxygenSaturation": 96
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T15:00:00Z",
        "bloodPressure": "119/80",
        "heartRate": 73,
        "oxygenSaturation": 98
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T16:00:00Z",
        "bloodPressure": "121/83",
        "heartRate": 75,
        "oxygenSaturation": 97
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T17:00:00Z",
        "bloodPressure": "120/82",
        "heartRate": 74,
        "oxygenSaturation": 96
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-11T18:00:00Z",
        "bloodPressure": "118/81",
        "heartRate": 72,
        "oxygenSaturation": 97
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-12T00:00:00Z",
        "bloodPressure": "122/80",
        "heartRate": 74,
        "oxygenSaturation": 98
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-12T01:00:00Z",
        "bloodPressure": "120/78",
        "heartRate": 75,
        "oxygenSaturation": 97
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-12T02:00:00Z",
        "bloodPressure": "119/77",
        "heartRate": 72,
        "oxygenSaturation": 98
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-12T03:00:00Z",
        "bloodPressure": "118/76",
        "heartRate": 70,
        "oxygenSaturation": 97
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-12T04:00:00Z",
        "bloodPressure": "120/79",
        "heartRate": 73,
        "oxygenSaturation": 98
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-12T05:00:00Z",
        "bloodPressure": "121/80",
        "heartRate": 74,
        "oxygenSaturation": 99
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-12T06:00:00Z",
        "bloodPressure": "122/81",
        "heartRate": 75,
        "oxygenSaturation": 97
    },
    {
        "patientIdNos": "26218",
        "recordDate": "2024-11-12T07:00:00Z",
        "bloodPressure": "121/79",
        "heartRate": 73,
        "oxygenSaturation": 98
    }
]);