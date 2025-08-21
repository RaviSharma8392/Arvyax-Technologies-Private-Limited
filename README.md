🌐 Live Demo Frontend: https://arvyax-wellness-platform.netlify.app/

🌿 Arvyax Wellness Session Platform A full-stack web application where users can register, log in, and create their own wellness sessions (like yoga, meditation). Sessions can be saved as drafts, published, and auto-saved while editing.

✨ Features User Authentication - Secure registration and login with JWT

Session Management - Create, edit, and publish wellness sessions

Auto-save Drafts - Sessions are automatically saved every 5 seconds of inactivity

Responsive Design - Works seamlessly on desktop and mobile devices

Clean UI/UX - Modern, wellness-focused interface with intuitive navigation

🛠️ Tech Stack Frontend: React.js, Vite, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: JWT with bcrypt

Deployment: Render (Backend), Netlify (Frontend)

🚀 Quick Start Prerequisites Node.js (v16 or higher)

MongoDB Atlas account

Git

Installation

Clone the repository
git clone https://github.com/RaviSharma8392/arvyax-wellness-platform.git cd arvyax-wellness-platform

Backend Setup
cd backend npm install

Create .env file
PORT=5000 MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
sCORS_ORIGIN=http://localhost:5173

Start development server
npm run dev

Frontend Setup
cd ../frontend npm install

Create .env file
VITE_API_URL=http://localhost:5000

Start development server
npm run dev

Access the application
Frontend: http://localhost:5173

Backend API: http://localhost:5000

📂 Project Structure: Arvyax Wellness Platform

arvyax-wellness-platform/ ├── backend/

│ ├── src/

│ │ ├── config/ # Database configuration

│ │ ├── controllers/ # Route controllers

│ │ ├── middleware/ # Custom middleware

│ │ ├── models/ # Mongoose models

│ │ ├── routes/ # API routes

│ │ └── server.js # Express server

│ ├── .env # Environment variables

│ └── package.json # Node dependencies

└── frontend/

├── public/ # Static assets

├── src/

│ ├── components/ # Reusable UI components

│ ├── pages/ # Route components

│ ├── layouts/ # Page layouts

│ ├── services/ # API services

│ └── App.jsx # Main app component

├── .env # Environment variables

└── package.json # Node dependencies

🗄️ Database Schema

User Model { \_id: ObjectId, // MongoDB automatically generates this unique identifier

email: String, // User's email address (unique, required)

password: String, // Hashed password (required)

created_at: Date // Timestamp of when the user was created

}

Session Model

{ \_id: ObjectId, // MongoDB automatically generates this unique identifier

user_id: ObjectId, // Reference to the user who created this session

title: String, // Title of the wellness session

tags: [String], // Array of tags/categories for the session

json_file_url: String, // URL to the JSON file containing session data

status: "draft" | "published", // Current status of the session

created_at: Date, // Timestamp of when the session was created

updated_at: Date // Timestamp of when the session was last updated }

🔌 API Endpoints Authentication

POST /api/users/register - Register a new user

POST /api/users/login - Login user

Sessions

GET /api/sessions - Get all public sessions

GET /api/sessions/my-sessions - Get user's sessions (requires auth)

GET /api/sessions/my-sessions/:id - Get a specific session (requires auth)

POST /api/sessions/my-sessions/save-draft - Save/update a draft (requires auth)

POST /api/sessions/my-sessions/publish - Publish a session (requires auth)

🔒 Security Features

Password hashing with bcrypt

JWT-based authentication

Protected API routes

📦 Deployment Backend (Render) Connect your GitHub repository to Render

Set environment variables in Render dashboard

Deploy automatically on git push

Frontend (netlify) Connect your GitHub repository to netlify

Set environment variables (VITE_API_URL to your deployed backend URL)

Deploy automatically on git push
