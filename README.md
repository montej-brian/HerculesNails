# Hercules Nails Full-Stack Project

This is the full-stack repository for Hercules Nails. It consists of a React (Vite + Tailwind CSS) frontend and a Node.js (Express) backend.

## Structure
- `/frontend` - Contains the Vite React app.
- `/backend` - Contains the Express Node API.

## Requirements
- Node.js (v18+)

## How to Run

You can run both the frontend and backend concurrently in separate terminal windows.

### Backend Setup
1. Open a terminal.
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file (if it doesn't exist) by copying `.env`:
   ```bash
   # Add your environment variables like PORT and DATABASE_URL
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   # Defaults to running on http://localhost:5000
   ```

### Frontend Setup
1. Open a new terminal.
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Development
Both the frontend and backend utilize hot-reloading using Vite and Nodemon (if configured) respectively.
