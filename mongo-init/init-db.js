db.createCollection('professionals');
db.createCollection('patients');
db.createCollection('medicalrecords');
db.createCollection('medicaldevices');
db.createCollection('cabinets');
db.createCollection('observations');
db.createCollection('encounters');

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

// Add more cabinets
const newCabinets = db.cabinets.insertMany([
    {
        "name": "Cabinet 3 - Marseille",
        "address": "3 rue de Marseille, 13001 Marseille",
        "phone": "04 91 23 45 67"
    },
    {
        "name": "Cabinet 4 - Toulouse",
        "address": "4 rue de Toulouse, 31000 Toulouse",
        "phone": "05 61 23 45 67"
    }
]);
const cabinet3Id = newCabinets.insertedIds[0];
const cabinet4Id = newCabinets.insertedIds[1];

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

// Add more professionals
const newProfessionals = db.professionals.insertMany([
    {
        "name": "Dr. Clara O'Neil",
        "role": "Neurologist",
        "cabinetId": cabinet3Id,
        "specialization": "Brain Disorders"
    },
    {
        "name": "Dr. Pierre Dubois",
        "role": "Dermatologist",
        "cabinetId": cabinet4Id,
        "specialization": "Skin Conditions"
    }
]);
const professional3Id = newProfessionals.insertedIds[0];
const professional4Id = newProfessionals.insertedIds[1];

// Insert patients and retrieve their _id fields
const patients = db.patients.insertMany([
    {
        "name": "Alice Smith",
        "active": true,
        "gender": "female",
        "dateOfBirth": "1990-01-01T00:00:00Z",
        "cabinetId": cabinet1Id,
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
        "deceased": false,
        "generalPractitioner": professional1Id
    },
    {
        "name": "Bob Smith",
        "active": true,
        "gender": "male",
        "cabinetId": cabinet2Id,
        "dateOfBirth": "1990-01-01T00:00:00Z",
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
        "deceased": false,
        "generalPractitioner": professional2Id
    }
]);

const patient1Id = patients.insertedIds[0];
const patient2Id = patients.insertedIds[1];

// Add more patients
const newPatients = db.patients.insertMany([
    {
        "name": "Charlie Brown",
        "active": true,
        "gender": "male",
        "dateOfBirth": "1985-05-15T00:00:00Z",
        "cabinetId": cabinet3Id,
        "urgentContact": {
            "name": "Lucy Brown",
            "phoneNumber": "321-654-0987"
        },
        "telecom": [
            {
                "system": "phone",
                "value": "321-654-0987",
                "use": "mobile"
            },
            {
                "system": "email",
                "value": "charlie.brown@example.com",
                "use": "home"
            }
        ],
        "maritalStatus": "married",
        "photo": "https://example.com/photos/charlie.jpg",
        "deceased": false,
        "generalPractitioner": professional3Id
    },
    {
        "name": "Diana Prince",
        "active": true,
        "gender": "female",
        "dateOfBirth": "1992-07-07T00:00:00Z",
        "cabinetId": cabinet4Id,
        "urgentContact": {
            "name": "Steve Trevor",
            "phoneNumber": "987-654-3210"
        },
        "telecom": [
            {
                "system": "phone",
                "value": "987-654-3210",
                "use": "mobile"
            },
            {
                "system": "email",
                "value": "diana.prince@example.com",
                "use": "home"
            }
        ],
        "maritalStatus": "single",
        "photo": "https://example.com/photos/diana.jpg",
        "deceased": false,
        "generalPractitioner": professional4Id
    }
]);
const patient3Id = newPatients.insertedIds[0];
const patient4Id = newPatients.insertedIds[1];

// Add more patients
const additionalPatients = db.patients.insertMany([
    {
        "name": "Eve Adams",
        "active": true,
        "gender": "female",
        "dateOfBirth": "1988-03-22T00:00:00Z",
        "cabinetId": cabinet1Id,
        "urgentContact": {
            "name": "Frank Adams",
            "phoneNumber": "555-123-4567"
        },
        "telecom": [
            {
                "system": "phone",
                "value": "555-123-4567",
                "use": "mobile"
            },
            {
                "system": "email",
                "value": "eve.adams@example.com",
                "use": "home"
            }
        ],
        "maritalStatus": "single",
        "photo": "https://example.com/photos/eve.jpg",
        "deceased": false,
        "generalPractitioner": professional1Id
    },
    {
        "name": "Frank Adams",
        "active": true,
        "gender": "male",
        "dateOfBirth": "1985-07-19T00:00:00Z",
        "cabinetId": cabinet2Id,
        "urgentContact": {
            "name": "Eve Adams",
            "phoneNumber": "555-123-4567"
        },
        "telecom": [
            {
                "system": "phone",
                "value": "555-123-4567",
                "use": "mobile"
            },
            {
                "system": "email",
                "value": "frank.adams@example.com",
                "use": "home"
            }
        ],
        "maritalStatus": "married",
        "photo": "https://example.com/photos/frank.jpg",
        "deceased": false,
        "generalPractitioner": professional2Id
    }
]);
const patient5Id = additionalPatients.insertedIds[0];
const patient6Id = additionalPatients.insertedIds[1];

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

// Add medical devices
const newMedicalDevices = db.medicaldevices.insertMany([
    {
        "patientId": patient3Id,
        "doctorId": professional3Id,
        "installationDate": "2024-11-11T00:00:00Z"
    },
    {
        "patientId": patient4Id,
        "doctorId": professional4Id,
        "installationDate": "2024-11-11T00:00:00Z"
    }
]);
const device3Id = newMedicalDevices.insertedIds[0];
const device4Id = newMedicalDevices.insertedIds[1];

// Add medical devices
const additionalMedicalDevices = db.medicaldevices.insertMany([
    {
        "patientId": patient5Id,
        "doctorId": professional1Id,
        "installationDate": "2024-11-12T00:00:00Z"
    },
    {
        "patientId": patient6Id,
        "doctorId": professional2Id,
        "installationDate": "2024-11-12T00:00:00Z"
    }
]);
const device5Id = additionalMedicalDevices.insertedIds[0];
const device6Id = additionalMedicalDevices.insertedIds[1];

// Insert medical records with deviceId
db.medicalrecords.insertMany([
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T00:00:00Z",
        "bloodPressure": "120/80",
        "heartRate": 75,
        "oxygenSaturation": 98,
        "notes": "Patient is responding well to treatment."
    },
    {
        "deviceId": device1Id,
        "recordDate": "2024-11-11T01:00:00Z",
        "bloodPressure": "118/79",
        "heartRate": 74,
        "oxygenSaturation": 97,
        "notes": "Patient showed slight improvement."
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

// Add medical records
db.medicalrecords.insertMany([
    {
        "deviceId": device3Id,
        "recordDate": "2024-11-11T00:00:00Z",
        "bloodPressure": "110/70",
        "heartRate": 65,
        "oxygenSaturation": 99,
        "notes": "Patient is healthy."
    },
    {
        "deviceId": device4Id,
        "recordDate": "2024-11-11T00:00:00Z",
        "skinCondition": "Clear",
        "notes": "No skin issues detected."
    }
]);

// Insert observations and retrieve their _id fields
const observations = db.observations.insertMany([
    {
        "status": "final",
        "code": "blood-pressure",
        "subject": patient1Id,
        "effectiveDateTime": "2024-11-11T00:00:00Z",
        "valueString": "120/80",
        "interpretation": ["normal"],
        "note": ["Blood pressure is within normal range"],
        "device": device1Id,
        "component": [
            {
                "code": "systolic",
                "valueInteger": 120,
                "interpretation": ["normal"]
            },
            {
                "code": "diastolic",
                "valueInteger": 80,
                "interpretation": ["normal"]
            }
        ]
    },
    {
        "status": "final",
        "code": "heart-rate",
        "subject": patient1Id,
        "effectiveDateTime": "2024-11-11T00:00:00Z",
        "valueInteger": 75,
        "interpretation": ["normal"],
        "note": ["Heart rate is within normal range"],
        "device": device1Id
    },
    {
        "status": "final",
        "code": "body-temperature",
        "subject": patient1Id,
        "effectiveDateTime": "2024-11-11T00:00:00Z",
        "valueString": "37.2°C",
        "interpretation": ["normal"],
        "device": device1Id
    },
    {
        "status": "final",
        "code": "blood-pressure",
        "subject": patient2Id,
        "effectiveDateTime": "2024-11-11T00:00:00Z",
        "valueString": "130/85",
        "interpretation": ["high"],
        "note": ["Blood pressure is slightly elevated"],
        "device": device2Id,
        "component": [
            {
                "code": "systolic",
                "valueInteger": 130,
                "interpretation": ["high"]
            },
            {
                "code": "diastolic",
                "valueInteger": 85,
                "interpretation": ["high"]
            }
        ]
    },
    {
        "status": "final",
        "code": "heart-rate",
        "subject": patient2Id,
        "effectiveDateTime": "2024-11-11T00:00:00Z",
        "valueInteger": 82,
        "interpretation": ["normal"],
        "note": ["Heart rate is within normal range"],
        "device": device2Id
    },
    {
        "status": "final",
        "code": "body-temperature",
        "subject": patient2Id,
        "effectiveDateTime": "2024-11-11T00:00:00Z",
        "valueString": "37.5°C",
        "interpretation": ["normal"],
        "device": device2Id
    }
]);

const observation1Id = observations.insertedIds[0];
const observation2Id = observations.insertedIds[3];

// Add observations
const newObservations = db.observations.insertMany([
    {
        "status": "final",
        "code": "cholesterol",
        "subject": patient3Id,
        "effectiveDateTime": "2024-11-11T00:00:00Z",
        "valueQuantity": {
            "value": 180,
            "unit": "mg/dL"
        },
        "interpretation": ["normal"],
        "device": device3Id
    },
    {
        "status": "final",
        "code": "skin-examination",
        "subject": patient4Id,
        "effectiveDateTime": "2024-11-11T00:00:00Z",
        "valueString": "No abnormalities",
        "interpretation": ["normal"],
        "device": device4Id
    }
]);
const observation3Id = newObservations.insertedIds[0];
const observation4Id = newObservations.insertedIds[1];

// Insert observations
const additionalObservations = db.observations.insertMany([
    {
        "status": "final",
        "code": "blood-glucose",
        "subject": patient5Id,
        "effectiveDateTime": "2024-11-12T08:00:00Z",
        "valueQuantity": {
            "value": 90,
            "unit": "mg/dL"
        },
        "interpretation": ["normal"],
        "device": device5Id
    },
    {
        "status": "final",
        "code": "blood-pressure",
        "subject": patient6Id,
        "effectiveDateTime": "2024-11-12T09:00:00Z",
        "valueString": "130/85",
        "interpretation": ["pre-high"],
        "device": device6Id,
        "component": [
            {
                "code": "systolic",
                "valueInteger": 130,
                "interpretation": ["pre-high"]
            },
            {
                "code": "diastolic",
                "valueInteger": 85,
                "interpretation": ["pre-high"]
            }
        ]
    }
]);
const observation5Id = additionalObservations.insertedIds[0];
const observation6Id = additionalObservations.insertedIds[1];

// Insert encounters and retrieve their _id fields
const encounters = db.encounters.insertMany([
    {
        "status": "completed",
        "class": "outpatient",
        "subject": patient1Id,
        "participant": [
            {
                "individual": professional1Id,
                "period": { "start": "2024-11-11T00:00:00Z", "end": "2024-11-11T01:00:00Z" }
            }
        ],
        "period": { "start": "2024-11-11T00:00:00Z", "end": "2024-11-11T01:00:00Z" },
        "reasonCode": ["routine check-up"],
        "diagnosis": [observation1Id],
        "serviceProvider": cabinet1Id
    },
    {
        "status": "completed",
        "class": "outpatient",
        "subject": patient2Id,
        "participant": [
            {
                "individual": professional2Id,
                "period": { "start": "2024-11-11T01:00:00Z", "end": "2024-11-11T02:00:00Z" }
            }
        ],
        "period": { "start": "2024-11-11T01:00:00Z", "end": "2024-11-11T02:00:00Z" },
        "reasonCode": ["routine check-up"],
        "diagnosis": [observation2Id],
        "serviceProvider": cabinet2Id
    }
]);

// Add encounters
db.encounters.insertMany([
    {
        "status": "completed",
        "class": "outpatient",
        "subject": patient3Id,
        "participant": [
            {
                "individual": professional3Id,
                "period": { "start": "2024-11-11T02:00:00Z", "end": "2024-11-11T03:00:00Z" }
            }
        ],
        "period": { "start": "2024-11-11T02:00:00Z", "end": "2024-11-11T03:00:00Z" },
        "reasonCode": ["annual physical"],
        "diagnosis": [observation3Id],
        "serviceProvider": cabinet3Id
    },
    {
        "status": "completed",
        "class": "outpatient",
        "subject": patient4Id,
        "participant": [
            {
                "individual": professional4Id,
                "period": { "start": "2024-11-11T03:00:00Z", "end": "2024-11-11T04:00:00Z" }
            }
        ],
        "period": { "start": "2024-11-11T03:00:00Z", "end": "2024-11-11T04:00:00Z" },
        "reasonCode": ["skin check-up"],
        "diagnosis": [observation4Id],
        "serviceProvider": cabinet4Id
    }
]);

// Add encounters
const additionalEncounters = db.encounters.insertMany([
    {
        "status": "completed",
        "class": "outpatient",
        "subject": patient5Id,
        "participant": [
            {
                "individual": professional1Id,
                "period": { "start": "2024-11-12T08:00:00Z", "end": "2024-11-12T09:00:00Z" }
            }
        ],
        "period": { "start": "2024-11-12T08:00:00Z", "end": "2024-11-12T09:00:00Z" },
        "reasonCode": ["diabetes check-up"],
        "diagnosis": [observation5Id],
        "serviceProvider": cabinet1Id
    },
    {
        "status": "completed",
        "class": "outpatient",
        "subject": patient6Id,
        "participant": [
            {
                "individual": professional2Id,
                "period": { "start": "2024-11-12T09:00:00Z", "end": "2024-11-12T10:00:00Z" }
            }
        ],
        "period": { "start": "2024-11-12T09:00:00Z", "end": "2024-11-12T10:00:00Z" },
        "reasonCode": ["blood pressure monitoring"],
        "diagnosis": [observation6Id],
        "serviceProvider": cabinet2Id
    }
]);