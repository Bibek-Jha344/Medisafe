# MEDISAFE

MEDISAFE is a local healthcare and physiotherapy support platform designed for patients, doctors, physiotherapists, and administrators. It provides symptom assessment, rule-based recommendation guidance, appointment management, prescription views, exercise recommendation, progress tracking, and a responsive healthcare dashboard.

## Features

- Registration and login with JWT-based authentication
- Role-aware dashboard access for patient, doctor, physiotherapist, and admin roles
- Symptom assessment and rule-based specialists recommendation engine
- Doctor directory, appointment booking, and cancellation flow
- Prescription review and upload functionality
- Exercise library and physiotherapy guidance
- Recovery progress tracking with chart visualization
- Admin dashboard with user and appointment stats
- Modern responsive healthcare UI using vanilla HTML, CSS, and JavaScript

## Technology Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB-ready schema with demo fallback mode
- Authentication: JWT + bcrypt
- Rule engine: Transparent, explainable rule-based logic

## Project Structure

```text
MEDISAFE/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── uploads/
├── frontend/
│   ├── css/
│   ├── js/
│   ├── *.html
│   └── assets/
├── README.md
├── PROJECT_REPORT.md
└── package-lock.json
```

## Setup

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

The frontend is static and served by the backend through Express. Open the app in a browser on:

```text
http://localhost:5000/
```

## Environment Variables

Create or update `.env` in the backend folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medisafe
JWT_SECRET=medisafe_jwt_secret_key_2024_bibek_jha
JWT_EXPIRE=7d
NODE_ENV=development
UPLOAD_PATH=./uploads
```

## Demo Credentials

- Patient: `bibek@medisafe.com` / `patient123`
- Admin: `admin@medisafe.com` / `admin123`

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/doctors`
- `GET /api/doctors/:id`
- `GET /api/appointments`
- `POST /api/appointments`
- `PUT /api/appointments/:id/cancel`
- `POST /api/symptoms/analyze`
- `GET /api/recommendations`
- `POST /api/recommendations`
- `GET /api/prescriptions`
- `POST /api/prescriptions`
- `GET /api/exercises`
- `GET /api/progress`
- `POST /api/progress`
- `GET /api/admin/stats`
- `GET /api/admin/users`
- `GET /api/admin/appointments`
- `GET /api/notifications`

## Rule-Based Recommendation Engine

The recommendation engine uses explainable rules rather than ML models. It maps affected body areas to likely specialties, evaluates pain severity, mobility limitations, and duration of symptoms, then returns specialist recommendations, physiotherapy guidance, and urgency alerts. This is a decision-support system and is clearly marked as not a medical diagnosis.

## Physiotherapy Module

The platform provides an exercise library with movement guidance, progress tracking, and recovery analysis. The progress page visualizes recovery score and joint angle trends to demonstrate the physiotherapy journey.

## Testing

The project can be verified by starting the backend and exercising the key endpoints with a browser or HTTP client. The built-in demo data is designed to be immediately usable without external services.

## Deployment

The project is designed for local deployment and can also be hosted on standard Node.js-compatible cloud hosting services with MongoDB configured through environment variables.
