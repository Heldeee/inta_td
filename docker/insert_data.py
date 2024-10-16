import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('/app/data/healthcare.db')
cursor = conn.cursor()

# Insert data into medecins table
medecins_data = [
    ('Dr. Jean Dupont', 'Cardiologue', 'jean.dupont@example.com'),
    ('Dr. Marie Curie', 'Cardiologue', 'marie.curie@example.com')
]
cursor.executemany('''
    INSERT INTO medecins (nom, specialite, email)
    VALUES (?, ?, ?)
''', medecins_data)

# Insert data into patients table
patients_data = [
    ('Martin', 'Durand', '1980-02-15', '12 Rue de la Paix, Paris', '0612345678', 'martin.durand@example.com'),
    ('Lucie', 'Martin', '1995-07-22', '45 Avenue de la République, Paris', '0698765432', 'lucie.martin@example.com')
]
cursor.executemany('''
    INSERT INTO patients (nom, prenom, date_naissance, adresse, telephone, email)
    VALUES (?, ?, ?, ?, ?, ?)
''', patients_data)

# Insert data into dossiers_medicaux table
dossiers_data = [
    (1, 1, '2024-10-16', 'Complications hypertensives détectées. Suivi quotidien recommandé.'),
    (2, 2, '2024-10-16', 'Patient en bonne santé, pas de problèmes notables.')
]
cursor.executemany('''
    INSERT INTO dossiers_medicaux (patient_id, medecin_id, date_creation, compte_rendu)
    VALUES (?, ?, ?, ?)
''', dossiers_data)

# Insert data into dispositifs_medicaux table
dispositifs_data = [
    (1, 'Monitor tension artérielle', '2024-10-15', 120.5, 75.0, 98.0),
    (2, 'Oxymètre de pouls', '2024-10-14', None, None, 99.0)
]
cursor.executemany('''
    INSERT INTO dispositifs_medicaux (patient_id, type_dispositif, date_installation, tension_arterielle, rythme_cardiaque, oximetrie)
    VALUES (?, ?, ?, ?, ?, ?)
''', dispositifs_data)

# Commit the transaction and close the connection
conn.commit()
conn.close()

print("Data inserted successfully!")
