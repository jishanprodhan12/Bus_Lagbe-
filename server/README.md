# BusLagbe Server

This is a minimal Express + MongoDB backend for BusLagbe.

## Features
- Save and fetch bookings
- Simple Mongoose model for bookings
- CORS enabled

## Setup
1. Copy `.env.example` to `.env` and fill in your MongoDB URI.

```bash
cd server
cp .env.example .env
# edit .env and paste your MONGODB_URI
npm install
npm run dev   # requires nodemon, included as a devDependency
```

The server runs on port defined by `PORT` in `.env` (defaults to 4000).

## API
- `GET /health` - health check
- `GET /bookings` - returns all bookings
- `POST /bookings` - create a booking
