db.createCollection('professionals');
db.createCollection('patients');
db.createCollection('medical_records');
db.createCollection('device_data');

// Création des index
db.professionals.createIndex({ "idNos": 1 }, { unique: true });
db.patients.createIndex({ "idNos": 1 }, { unique: true });
db.medical_records.createIndex({ "patientId": 1 });
db.device_data.createIndex({ "patientId": 1, "timestamp": 1 });

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

db.device_data.insertMany([
    {
        "patientId": "patient1",
        "timestamp": new Date(),
        "data": {
            "systolic": 120,
            "diastolic": 80
        }
    },
    {
        "patientId": "patient2",
        "timestamp": new Date(),
        "data": {
            "systolic": 125,
            "diastolic": 85
        }
    },
    {
        "patientId": "1",
        "timestamp": new Date(),
        "data": {
            "systolic": 130,
            "diastolic": 90
        }
    }
]);

db.medical_records.insertMany([
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