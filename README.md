# Arab's AgroTech Hub

Full-stack marketplace for farmers, buyers, logistics partners, and analytics powered by React, Node.js/Express, and MongoDB.

## Structure

- `server/` — Express backend, MongoDB models, authentication, marketplace routes, payments, analytics.
- `client/` — React + Tailwind frontend with routing, dashboard pages, marketplace view, checkout, and community sections.

## Setup

1. Install dependencies in both folders:
   - `cd server && npm install`
   - `cd ../client && npm install`

2. Configure MongoDB:
   - Copy `server/.env.example` to `server/.env`
   - Set `MONGODB_URI`, `JWT_SECRET`, `PORT`

3. Run the backend:
   - `cd server && npm run dev`

4. Run the frontend:
   - `cd client && npm run dev`

5. Or run both together from the project root:
   - `npm install && npm start`

6. Seed sample marketplace content:
   - `GET http://localhost:5000/api/seed`

## Notes

- Authentication uses JWT tokens.
- Payment endpoints simulate Paystack/Flutterwave checkout flows.
- Admin analytics are available at `/api/admin/dashboard` once data exists.
- Frontend proxy routes API calls to the backend.
