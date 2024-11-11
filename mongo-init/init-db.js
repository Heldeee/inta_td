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
        "patientId": "patient1",
        "timestamp": new Date(),
        "nomenclatureId": "1.2.250.1.213.3.3.11/934",
        "value": 120
    }
]);