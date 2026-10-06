# MEDISAFE Deployment Guide

## Local production-style run

1. Go to the backend folder:
   `cd backend`
2. Copy the environment example file:
   `copy .env.example .env`
3. Update the values in `.env` for your environment.
4. Start the server:
   `npm start`

## Deploy to Render

1. Push this repository to GitHub.
2. Create a new Web Service on Render.
3. Connect the repository.
4. Use the following settings:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && node server.js`
5. Add environment variables:
   - `NODE_ENV=production`
   - `PORT=10000`
   - `JWT_SECRET=your_secure_secret`
   - `JWT_EXPIRE=7d`
   - `MONGODB_URI=your_mongodb_connection_string`
6. Deploy.

## Deploy to Railway / Render / other Node hosts

The app is already structured for a single Node.js backend deployment. It serves the frontend static files and exposes the API from the same server.

The health check endpoint is:
`/api/health`

## Notes

- If MongoDB is not configured, the app automatically runs in demo mode.
- The app is ready for hosting without any code rewrite.
