-- Create table for doctors (medecins)
CREATE TABLE IF NOT EXISTS medecins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    specialite TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

-- Create table for patients
CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    date_naissance DATE NOT NULL,
    adresse TEXT,
    telephone TEXT UNIQUE,
    email TEXT UNIQUE
);

-- Create table for medical records (dossiers_medicaux)
CREATE TABLE IF NOT EXISTS dossiers_medicaux (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    medecin_id INTEGER,
    date_creation DATE NOT NULL,
    compte_rendu TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (medecin_id) REFERENCES medecins(id)
);

-- Create table for medical devices (dispositifs_medicaux)
CREATE TABLE IF NOT EXISTS dispositifs_medicaux (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    type_dispositif TEXT NOT NULL,
    date_installation DATE NOT NULL,
    tension_arterielle REAL,
    rythme_cardiaque REAL,
    oximetrie REAL,
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);
