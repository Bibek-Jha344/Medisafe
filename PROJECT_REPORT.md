# MEDISAFE Project Report

## 1. Abstract

MEDISAFE is a healthcare support platform focused on local symptom assessment, specialist recommendation, exercise guidance, appointment management, and recovery tracking. The system is designed for academic use and demonstrates a rule-based medical decision support flow with a patient-centered responsive interface.

## 2. Introduction

Healthcare access remains a challenge in many local communities where patients need a simple, understandable way to connect with relevant specialists and manage recovery. MEDISAFE presents a lightweight digital tool that helps patients describe symptoms, understand urgency, identify suitable specialists, and track physiotherapy progress.

## 3. Problem Statement

Patients often struggle to decide whether their symptoms require urgent care, which specialist to consult, and how to continue recovery after initial treatment. Without accessible guidance, they may delay appropriate medical attention or begin exercise programs without adequate support.

## 4. Objectives

- Provide symptom-based assessment and specialist recommendation
- Support appointment booking and follow-up management
- Offer exercise and physiotherapy guidance
- Track recovery using progress indicators and trend analysis
- Present a role-aware, accessible healthcare dashboard

## 5. Existing System

The project originally had a partial healthcare platform with landing pages and backend scaffolding. It lacked complete front-end module coverage, missing routes, and stronger end-to-end demo functionality. This report describes the completed system built on the existing architecture.

## 6. Proposed System

The proposed MEDISAFE system extends the existing application with rule-based recommendation logic, patient dashboards, specialist browsing, appointment booking, prescription records, recovery tracking, and admin oversight. The architecture remains vanilla HTML/CSS/JS on the frontend and Node.js/Express.js on the backend.

## 7. System Architecture

The system uses a layered architecture:

- Frontend: static pages served by Express and styled with a healthcare-focused responsive design
- Backend: route handlers, controllers, and middleware
- Service layer: recommendation engine logic
- Data layer: demo data with MongoDB-ready schema support and fallback data model
- Authentication: JWT-based session control

## 8. Technology Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB-compatible schema with local demo fallback
- Auth: bcrypt + JWT
- Visualization: native SVG-based chart in the browser

## 9. Functional Requirements

- User registration and login
- Role-based access for patient, doctor, physiotherapist, and admin
- Symptom assessment form
- Specialist and physiotherapy suggestions
- Appointment booking and management
- Prescription viewing and upload support
- Exercise library and progress tracking
- Notification viewing
- Admin dashboard overview

## 10. Non-functional Requirements

- Responsive interface
- Clear loading and error states
- Secure local token handling
- Explainable rule-based engine
- Fast local demo operation without external services

## 11. Modules

### Patient Module
- Dashboard
- Symptom check
- Recommendations
- Doctors and appointment booking
- Prescription management
- Physiotherapy exercises
- Recovery progress

### Doctor Module
- Doctor dashboard
- Patient list and care overview
- Appointment management

### Physiotherapist Module
- Therapy plan overview
- Recovery analysis
- Exercise progression insights

### Admin Module
- User management overview
- Appointment summary
- System statistics

## 12. Database Design

The project uses MongoDB-compatible structures for core entities such as users, doctors, appointments, prescriptions, exercises, progress, recommendations, and notifications. In a local demo environment, the system uses in-memory data seeded from the demo dataset when MongoDB is unavailable.

## 13. Rule-Based Recommendation Engine

The engine uses deterministic rules to map body parts to likely specialist categories and exercise recommendations. It evaluates pain severity, symptom duration, mobility difficulty, and emergency indicators. The system marks itself as support-only rather than diagnosis.

Example rule logic:

- If body part is knee or shoulder, recommend orthopedic and physiotherapy support.
- If pain level is high, recommend urgent consultation.
- If mobility difficulty is high, physiotherapy is strongly recommended.
- If chest pain is severe, alert for urgent medical intervention.

## 14. Physiotherapy Progress Analysis

The progress module includes a recovery score, exercise completion metrics, mobility improvement, and a graphical joint-angle timeline. It shows an example recovery trajectory and demonstrates a professional physiotherapy monitoring concept without requiring external ML services.

## 15. Implementation

The implementation keeps the original project structure and extends it using the existing backend and frontend folders. The project integrates demo data, secure auth, API access, and a sequence of healthcare pages tailored for the local healthcare platform use case.

## 16. Testing

The system was checked through backend startup and API validation, including health checks, authentication, doctor listing, and symptom analysis access. Demo credentials allow immediate testing without external setup.

## 17. Results and Discussion

The completed project is operational as a local academic healthcare platform with live demo data and role-based access simulation. It provides a practical demonstration of symptom analysis, treatment recommendations, appointment workflow, and physiotherapy tracking in a compact, understandable system.

## 18. Limitations

- Uses demo data rather than live medical records
- Rule engine is educational and decision-support oriented
- No real payment or cloud storage integration
- No real-time doctor communication features

## 19. Future Scope

- Integrate a real MongoDB production database
- Add doctor/physiotherapist profile management
- Support resilient file uploads and document storage
- Extend to multilingual interfaces and appointment slot logic
- Add analytics and automated notifications

## 20. Conclusion

MEDISAFE successfully demonstrates a local healthcare and physiotherapy support platform using transparent rule-based recommendation logic, role-based access, and a responsive end-user interface. It remains aligned with the original academic project vision while being practical and demonstrable in a local environment.
