📚 E-Learning Platform (Full Stack)
A full-stack E-Learning Platform built using React, Node.js, Express, MongoDB, and JWT authentication, featuring course browsing, enrollment, progress tracking, admin controls, and cloud deployment.

🚀 Live Demo
Frontend (Vercel): https://e-learning-platform-three.vercel.app/
Backend (Render): https://your-backend-url.onrender.com

🧠 Project Purpose
This project simulates a real-world e-learning system, demonstrating:
Secure authentication
Role-based access (Admin/User)
REST API design
Database modeling
Cloud deployment
Clean UI/UX
It is suitable for portfolios, internships, and final-year submissions.

🛠 Tech Stack
Frontend
React (Vite)
React Router
Tailwind CSS
Axios

Backend
Node.js
Express.js
MongoDB Atlas
Mongoose
JWT Authentication
bcrypt.js

Deployment
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas

Testing;
Jest
Supertest

React Testing Library
✨ Features
👤 Public
Landing page with marketing section
Browse courses
Filter courses by:
Category
Difficulty
Price (Free / Paid)

🔐 User
Signup & Login (JWT-based)
Enroll in courses
View enrolled courses
Track learning progress
Protected dashboard

🛡 Admin
Create courses
Delete courses
View all courses
Admin-only access control

🗂 Project Structure
e-learning-platform/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── main.jsx
│   └── index.html
│
└── README.md

🧩 Data Models
User
{
  name,
  email,
  passwordHash,
  role: "user" | "admin",
  createdAt
}

Course
{
  title,
  slug,
  description,
  category,
  difficulty,
  price,
  lessons,
  createdAt
}

Enrollment
{
  userId,
  courseId,
  progressPercent,
  enrolledAt
}

API Endpoints:
Auth:
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me

Courses:
GET /api/courses
POST /api/courses (Admin)
DELETE /apicourses/:id (Admin)

Enrollments:
POST /api/enrollments/enroll
GET /api/enrollments/me
PUT /api/enrollments/:id/progress

Security & Best Practices:
Password hashing using bcrypt
JWT authentication
Role-based authorization
Protected routes
Environment variables for secrets
Input validation

Testing:
Backend API tests using Jest + Supertest
Frontend component tests using React Testing Library
Manual end-to-end testing

Local Setup:
Backend:
cd backend
npm install
npm run dev

Frontend:
cd frontend
npm install
npm run dev

Create .env in backend:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

What I Learned:
Full-stack system design
JWT-based authentication
REST API development
MongoDB data modeling
Admin authorization
Cloud deployment (Vercel & Render)
Writing clean, scalable code

Conclusion:
This project demonstrates a complete production-style MERN application, covering frontend, backend, database, security, testing, and deployment.

Author:
Rasika Shinde
Computer Engineering Student
Backend & Full-Stack Developer
