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

- Login
- Logout
- Dashboard - Doctor - Secretary - Patient
- Doctor
  - See all patients
  - Create patient
  - Transfer patient
    - To FHIR server [Hapi FHIR Base64](https://hapi.fhir.org/baseR4/swagger-ui/?page=Patient)
    - To download resource of a patient
    - Change patient ofc abinet

-  Secretary
  -  Assign doctor to cabinet
  -  See all patients
  -  Create patient
  -  Transfer patient
    -  To download resource of a patient
    -  Change patient of cabinet

-  Patient
  We chose not to implement a patient dashboard because the patient is not supposed to have access to the application, the patient is supposed to be a resource that the doctor and the secretary can manage.

-  Admin
  An admin has access to the configuration file but does not have an specific dashboard or role, it is summon when the cabinet needs it, to create a new doctor or secretary or cabinet.
## Database

The application uses MongoDB to store patient data and Keycloak with PostgreSQL for authentication and authorization.


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

### Professionals

- GET /api/professionals: Retrieve a list of all professionals.
- GET /api/professionals/:id: Retrieve professional data by ID.
- POST /api/professionals: Create a new professional.

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

## Reponses TD3

#### Quelles ressources FHIR seront nécessaires pour transmettre des données de tension artérielle, de rythme cardiaque et d’oxymétrie?

Pour transmettre ces données de santé à l'aide de FHIR, les ressources suivantes seront probablement nécessaires :

- **Observation** : C'est la ressource principale pour représenter une mesure ou une observation, telle que la tension artérielle, le rythme cardiaque, ou l’oxymétrie. Chaque type de mesure sera représenté par une instance distincte de la ressource Observation.
  - **Catégorie de l'Observation** : vital-signs pour les trois cas.
  - **Code (ce qui a été mesuré)** :
    - Tension artérielle : 85354-9 (Blood pressure) avec des composants pour la systolique et la diastolique.
    - Rythme cardiaque : 8867-4 (Heart rate)
    - Oxymétrie (saturation en oxygène) : 59408-5 (Oxygen saturation in Arterial blood)
  - **Valeur (résultat de la mesure)** : dépendra du type de données (quantitative pour les trois, avec unités appropriées, e.g., mmHg pour la tension artérielle, battements par minute pour le rythme cardiaque, % pour l’oxymétrie).
- **Patient** : Pour identifier le patient auquel les observations sont associées.
- **Practitioner (ou PractitionerRole)** : Pour identifier le professionnel de santé responsable de la transmission des données, si cela est pertinent pour votre scénario.
- **Encounter (éventuellement)** : Si les mesures sont prises dans le contexte d’une visite ou d’une consultation spécifique, cette ressource pourrait être utilisée pour lier les observations à cet événement.

#### Quels seraient les « archétypes » openEHR impliqués?

Basé sur le mindmap fourni et en relation avec les données demandées :

- **Tension artérielle** : L'archétype openEHR correspondant pourrait être Blood Pressure.
- **Rythme cardiaque** : L'archétype openEHR approprié pourrait être Pulse/Heart beat.
- **Oxymétrie (Saturation en oxygène)** : L'archétype openEHR correspondant pourrait être Inspired Oxygen.

Veuillez noter : La disponibilité et les noms exacts des archétypes peuvent varier dans la base de connaissances openEHR. Il est recommandé de consulter directement la base de connaissances pour les archétypes les plus à jour et les plus appropriés.

#### Quelles différences voyez-vous entre FHIR et openEHR sur la modélisation des données de tension, d’oxymétrie et de rythme cardiaque?

- **Approche de Modélisation** :
  - **FHIR** : Utilise un ensemble prédefini mais extensible de ressources (comme Observation) qui peuvent être combinées pour représenter divers scénarios de santé. La modélisation est plus générique et flexible, avec un focus sur l’échange de données.
  - **openEHR** : S'appuie sur des archétypes spécifiques, définis avec précision pour différents types de données de santé. Ces archétypes sont construits à partir d’un modèle de référence commun, offrant une grande profondeur dans la description des données de santé.
- **Granularité et Spécificité** :
  - **FHIR** : Peut nécessiter plus de configuration ou de profilage (via FHIR Profiles) pour atteindre le même niveau de spécificité que les archétypes openEHR, surtout pour des cas d’utilisation complexes.
  - **openEHR** : Offre une granularité et une spécificité élevées dès le départ, grâce à ses archétypes détaillés, ce qui peut faciliter la représentation précise de données de santé spécifiques.
- **Échange de Données vs. Modélisation des Dossiers de Santé Électroniques (DSE)** :
  - **FHIR** : Conçu principalement pour faciliter l’échange de données de santé entre systèmes, même si il peut être utilisé pour alimenter un DSE.
  - **openEHR** : Principalement centré sur la création, le stockage et la gestion de dossiers de santé électroniques (DSE) à l’aide d’archétypes, mais peut également supporter l’échange de données.

#### Quels profils IHE devraient être utilisés (bien que l’on ne le fera pas pour ne pas se compliquer la vie…)?

Pour un scénario impliquant la transmission de données de vitalité (tension artérielle, rythme cardiaque, oxymétrie) entre un dispositif médical connecté et un cabinet médical, les profils IHE suivants pourraient être pertinents si l’on devait les implémenter :

- **IHE Patient Demographic Query (PDQ)** : Pour récupérer les informations démographiques du patient, si nécessaire.
- **IHE Cross-Enterprise Document Sharing (XDS)** : Pour partager les documents de santé (qui pourraient inclure les résultats des mesures de vitalité) entre différentes entités de soins.
- **IHE Cross-Community Access (XCA)** : Si l’accès aux documents de santé doit être étendu au-delà des communautés de soins locales.
- **IHE Mobile Alert Communication (mACM)** : Spécifiquement conçu pour les alertes et les communications issues de dispositifs mobiles ou connectés, ce qui pourrait être pertinent si les données des dispositifs médicaux connectés déclenchent des alertes basées sur des seuils.


## Schema of the tables

[![](https://mermaid.ink/img/pako:eNqNVk1v4zgM_SuGzkkxzWeb47QLbA-DFs3uZdELLTGOtrZkSHIwnjb_fWnZSWxLmW0OSSyS4nuPFOUPxrVAtmFoHiVkBoo3ldDnAVKp0CUf7WPzsc5IlSUKCgwWQQiD1gbr5V6rzvvY_rwYvSNPqRXkX93d6DxctCVyCbn8BY42u5if03-RuyeR8JbCkwhC37HmuYb3vy2aS8ITQNoP1f8zTzWhApUAd_LQWxfg0H89775L4_bBNhkqgeZrgFtbUhkKcg9aOcp2sYIxUCcOc-S6CJEJ5AgWQ_4FGOkg3zpwVbRmTkfgEQQ0kL-YhnGjeZ9EC6VAITnkf0rrtKkHsv5oTY94kBz74p73L1vhQ_pkE5rTjn2Tl1kqSzxy3wGPtDDGY0gYI2wMyKs3RYEIjzFI1m42TNNJluZai5fmBFQmtO4RjHuNxemfNam6pTKYURefWk47HML_Q3FdKYcm0qA2XlCeQ_9odl1Tlxjhbiv_b-xdEgPJZQnKBc1ZopFahNKD1eqBhsvYImjOKG2ljaVH02hPQ-Igz4ekY_6cNlavU597uyl5Kyd3st-TV1RpAzjVIzs3aV-tAeTrwpwteKrIqF9wt0M_G5qW-UsW4xkhqVsw0I3U3GlTRHgcIK9w6_-HZ90bv7cPF6uqipQ6xRufCGIWgPSmEGAnasOqNOhGzdlam94MT4IW9VZGDAW6vRZXT1vYPjs0pCy-gsoCK427kubPqRmpQYa31ufndKo_hnfNJnlje7BvLO7aTf3fe10OX88vcq8d9XT6-XmObpxTzLXKbEKjlUUiugTDKdnEFaAgQxsNatIEqM5HlSYHVfB3gf0T5UPb3uuz6mT5GqHO-SqXnrAj36iwEb8x4kEJhgk7yP3ChpDjIeO2KbSSdP2gSNI6Hjmk3N0tTSinOegwBNm5dBlDqYZQx6M_wk2qg84Pl0YZOscOw_WIK2LTJVwVlK_Hpu8SAQWprtxp_4jvsOy5VO-k8aU644gYi9O87NcmkilUuLItdTZhNG0LkILegv298sbcHmkaMk8azHvjdiQ_qJze1oqzjTMVTpjRVbZnmx3klp6qspmo3Vv0yYVuzH-07j-yzQf7yTbT2WJxc79cz26_rdar28XyfjVhdbO-Xt-sbpeLu_lyPf82n69Wxwn75feY3cyXs8V6MVvc3d-tZ2SaMOJFrfmjfYn37_LH_wCZL8i3?type=png)](https://mermaid.live/edit#pako:eNqNVk1v4zgM_SuGzkkxzWeb47QLbA-DFs3uZdELLTGOtrZkSHIwnjb_fWnZSWxLmW0OSSyS4nuPFOUPxrVAtmFoHiVkBoo3ldDnAVKp0CUf7WPzsc5IlSUKCgwWQQiD1gbr5V6rzvvY_rwYvSNPqRXkX93d6DxctCVyCbn8BY42u5if03-RuyeR8JbCkwhC37HmuYb3vy2aS8ITQNoP1f8zTzWhApUAd_LQWxfg0H89775L4_bBNhkqgeZrgFtbUhkKcg9aOcp2sYIxUCcOc-S6CJEJ5AgWQ_4FGOkg3zpwVbRmTkfgEQQ0kL-YhnGjeZ9EC6VAITnkf0rrtKkHsv5oTY94kBz74p73L1vhQ_pkE5rTjn2Tl1kqSzxy3wGPtDDGY0gYI2wMyKs3RYEIjzFI1m42TNNJluZai5fmBFQmtO4RjHuNxemfNam6pTKYURefWk47HML_Q3FdKYcm0qA2XlCeQ_9odl1Tlxjhbiv_b-xdEgPJZQnKBc1ZopFahNKD1eqBhsvYImjOKG2ljaVH02hPQ-Igz4ekY_6cNlavU597uyl5Kyd3st-TV1RpAzjVIzs3aV-tAeTrwpwteKrIqF9wt0M_G5qW-UsW4xkhqVsw0I3U3GlTRHgcIK9w6_-HZ90bv7cPF6uqipQ6xRufCGIWgPSmEGAnasOqNOhGzdlam94MT4IW9VZGDAW6vRZXT1vYPjs0pCy-gsoCK427kubPqRmpQYa31ufndKo_hnfNJnlje7BvLO7aTf3fe10OX88vcq8d9XT6-XmObpxTzLXKbEKjlUUiugTDKdnEFaAgQxsNatIEqM5HlSYHVfB3gf0T5UPb3uuz6mT5GqHO-SqXnrAj36iwEb8x4kEJhgk7yP3ChpDjIeO2KbSSdP2gSNI6Hjmk3N0tTSinOegwBNm5dBlDqYZQx6M_wk2qg84Pl0YZOscOw_WIK2LTJVwVlK_Hpu8SAQWprtxp_4jvsOy5VO-k8aU644gYi9O87NcmkilUuLItdTZhNG0LkILegv298sbcHmkaMk8azHvjdiQ_qJze1oqzjTMVTpjRVbZnmx3klp6qspmo3Vv0yYVuzH-07j-yzQf7yTbT2WJxc79cz26_rdar28XyfjVhdbO-Xt-sbpeLu_lyPf82n69Wxwn75feY3cyXs8V6MVvc3d-tZ2SaMOJFrfmjfYn37_LH_wCZL8i3)

## Schema of the architecture

![](https://mermaid.ink/img/pako:eNqFV21v6jYU_itRJsSd5FuREALkwyRKaFcVCgNupS2gySQGIkKMkrC7DvjvsxPbMXlp8wXs8xyf9-Pji-piD6mW2mhc_NBPLOXSTPboiJqW0vRgdGgCJdt4h5EPNwGKCeWiNAM_REMc4KhpNTcBdA_N2-3WaKzCXQRPe2Vpr0KFfI2GMoF-qMQo-sd3UazESXR2k3OEMnp83mQMK_UpwmGCQk9ZZFjF6mjd9krNgPR7mk_flo7ADU6ndU4kkgTFxccTDlGYxDldkjTMydLp9BtOJ7O_B7btDDxvBhOfYJ5wdFxXocaj-dIZBChK4rEfJ1UYe7D43bFhvN9gGJEDd6gSNXp3bERNHuIwRG7i47AOO54-v7w5Y7zzayGTke1MkOe7MJgjF0denQUEOB8N77G1pswGS4d55CXcYglCHF4dBR7zyhgsOLEQgcX7MHWIlzqEodZlzOvoT-eAPtwAw0M9ivriKNtXD6UGnjIDyyBhY_qnlLqPJP_vM7fVasmWPQ6Grw5HlfKWhD2JcEBSqS5fc3oxYZfzseSvOIeuK4Ald3yBl3zyFXI-fXJOEd6iOCbpC4NqfDFXJqT5BNVGM1LB3snUlurFhglclwGlCqjASPlcRaXmzCRzPrFhjs9JTZIzUsGG-fTHciQHLYOtq1DliH0ClsP1GawUqxL4i3ynft_AGClVVTyZvj1PnW8THO6w_ahYereldX-VDp9NF8vn-WjhfJvhONlFaPHHmJSM0dY5qlrq4JzsuURZIG0Fr6wVKFZP67XKx2RVxpprrGxQ8hOhsNCi0vtF-f79t-tg9qIQlwfxNS3dEplocqVyMwKFpPvUL9fMAQVKgYP8kRi4QyRlRRP1yU9EYkTuNKF-hmKdkut7Fb0gJ5PsKZDJTk4m-VIgk52czJWUdBf68V5Wrx7XJj3iR4ziKy9eic4VzOlCQa5PgS40FG2nCCBbXFFRaSkmy3IlwUVXiVKrhAmNRJFVwoRieZFV4yT9iCMXyQcZpXbZ2g1gHNtoy_NS2fpBYP2iux29pwMyOuEDEkuXTl_Wz72foAK3GH84_7bX6cCcP1t-xs9bNzvA7bRb7ZY4gC3rDzjS3s14zY1huprgZct63oj6i_F6nrnRc7lsWc_r8b6UsXcNQ9dydrasZ4e0wTCX9TrIzLVmyztWiTlrDSCtdhY6mcqnSpAPjkDMh4DPgCAf8ACfz4A0qAE-h-XxvRPCUhrwpAU8LUFeKnlkZVZWl4DVH2B1Bng5ZfGUOURhAVE7QJQHkCogjea9LNIcAe94ImIyhPYdGgoVqEcUHaHvkffJhSJWavoUWakW-UtfJ_QauBEcgePFR-iqFnleIKASsbu9am3J3UZW5xMRg2wfkpvkyCEnGP6FsbxUrYv6r2ppxoNmaj2zb5iaqZudHlA_6K7x0Nd7bU3vt9uGYWj6Daj_pQdoD2ar1W9326ZpkMrqd7pAJVd2gqNJ9rZKn1i3_wEUxQ6z)

## Reponses TD3

Quelles ressources FHIR seront nécessaires pour transmettre des données de tension artérielle, de rythme cardiaque et d’oxymétrie?
Pour transmettre ces données de santé à l'aide de FHIR, les ressources suivantes seront probablement nécessaires :
•	Observation : C'est la ressource principale pour représenter une mesure ou une observation, telle que la tension artérielle, le rythme cardiaque, ou l’oxymétrie. Chaque type de mesure sera représenté par une instance distincte de la ressource Observation.
•	Catégorie de l'Observation : vital-signs pour les trois cas.
•	Code (ce qui a été mesuré) :
•	Tension artérielle : 85354-9 (Blood pressure) avec des composants pour la systolique et la diastolique.
•	Rythme cardiaque : 8867-4 (Heart rate)
•	Oxymétrie (saturation en oxygène) : 59408-5 (Oxygen saturation in Arterial blood)
•	Valeur (résultat de la mesure) : dépendra du type de données (quantitative pour les trois, avec unités appropriées, e.g., mmHg pour la tension artérielle, battements par minute pour le rythme cardiaque, % pour l’oxymétrie).
•	Patient : Pour identifier le patient auquel les observations sont associées.
•	Practitioner (ou PractitionerRole) : Pour identifier le professionnel de santé responsable de la transmission des données, si cela est pertinent pour votre scénario.
•	Encounter (éventuellement) : Si les mesures sont prises dans le contexte d’une visite ou d’une consultation spécifique, cette ressource pourrait être utilisée pour lier les observations à cet événement.
2. Quels seraient les « archétypes » openEHR impliqués?
Basé sur le mindmap fourni et en relation avec les données demandées :
•	Tension artérielle : L'archétype openEHR correspondant pourrait être Blood Pressure
•	Rythme cardiaque : L'archétype openEHR approprié pourrait être Pulse/Heart beat
•	Oxymétrie (Saturation en oxygène) : L'archétype openEHR correspondant pourrait être Inspired Oxygen
Veuillez noter : La disponibilité et les noms exacts des archétypes peuvent varier dans la base de connaissances openEHR. Il est recommandé de consulter directement la base de connaissances pour les archétypes les plus à jour et les plus appropriés.
3. Quelles différences voyez-vous entre FHIR et openEHR sur la modélisation des données de tension, d’oxymétrie et de rythme cardiaque?
•	Approche de Modélisation :
•	FHIR : Utilise un ensemble prédefini mais extensible de ressources (comme Observation) qui peuvent être combinées pour représenter divers scénarios de santé. La modélisation est plus générique et flexible, avec un focus sur l’échange de données.
•	openEHR : S'appuie sur des archétypes spécifiques, définis avec précision pour différents types de données de santé. Ces archétypes sont construits à partir d’un modèle de référence commun, offrant une grande profondeur dans la description des données de santé.
•	Granularité et Spécificité :
•	FHIR : Peut nécessiter plus de configuration ou de profilage (via FHIR Profiles) pour atteindre le même niveau de spécificité que les archétypes openEHR, surtout pour des cas d’utilisation complexes.
•	openEHR : Offre une granularité et une spécificité élevées dès le départ, grâce à ses archétypes détaillés, ce qui peut faciliter la représentation précise de données de santé spécifiques.
•	Échange de Données vs. Modélisation des Dossiers de Santé Électroniques (DSE) :
•	FHIR : Conçu principalement pour faciliter l’échange de données de santé entre systèmes, même si il peut être utilisé pour alimenter un DSE.
•	openEHR : Principalement centré sur la création, le stockage et la gestion de dossiers de santé électroniques (DSE) à l’aide d’archétypes, mais peut également supporter l’échange de données.
4. Quels profils IHE devraient être utilisés (bien que l’on ne le fera pas pour ne pas se compliquer la vie…)?
Pour un scénario impliquant la transmission de données de vitalité (tension artérielle, rythme cardiaque, oxymétrie) entre un dispositif médical connecté et un cabinet médical, les profils IHE suivants pourraient être pertinents si l’on devait les implémenter :
•	IHE Patient Demographic Query (PDQ) : Pour récupérer les informations démographiques du patient, si nécessaire.
•	IHE Cross-Enterprise Document Sharing (XDS) : Pour partager les documents de santé (qui pourraient inclure les résultats des mesures de vitalité) entre différentes entités de soins.
•	IHE Cross-Community Access (XCA) : Si l’accès aux documents de santé doit être étendu au-delà des communautés de soins locales.
•	IHE Mobile Alert Communication (mACM) : Spécifiquement conçu pour les alertes et les communications issues de dispositifs mobiles ou connectés, ce qui pourrait être pertinent si les données des dispositifs médicaux connectés déclenchent des alertes basées sur des seuils.
Remarque : L’implémentation de profils IHE peut ajouter de la complexité due aux exigences de normalisation et d’interopérabilité qu’ils imposent. Cela nécessite souvent une planification et une mise en œuvre soigneuses pour garantir l’interopérabilité entre différents systèmes de santé.

