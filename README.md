# Task Manager App – MERN Stack

A full-stack Task Manager web application built using the MERN stack that helps users organize and manage daily tasks efficiently.

The application supports secure authentication, task management with CRUD operations, task status tracking, and responsive UI functionality.

---

# Overview

The **Task Manager App** allows users to:

- Register and log in securely
- Create and manage personal tasks
- Update task information
- Delete completed or unwanted tasks
- Track task completion status
- Manage optional due dates

This project demonstrates full-stack MERN development with authentication, REST APIs, MongoDB integration, and deployment workflows.

---

# Features

- JWT-based user authentication
- User registration and login system
- Create new tasks
- Update task details
- Delete tasks
- Mark tasks as completed or pending
- Optional due date support
- Responsive and clean user interface
- Fully deployed frontend and backend

---

# Tech Stack

## Frontend
- React.js
- Vite
- JavaScript
- CSS

## Backend
- Node.js
- Express.js
- JWT Authentication

## Database
- MongoDB Atlas

## Deployment
- Netlify (Frontend)
- Render (Backend)

---

# Project Structure

```bash
Task-Manager-App/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   └── package.json
│
├── README.md
└── package-lock.json
```

---

# Live Deployment

## Backend API

```bash
https://task-manager-app-f5uf.onrender.com
```

## Frontend Application

```bash
https://dailytaskmanagerapp.netlify.app
```

---

# Installation

## 1. Clone the Repository

```bash
git clone <repository-url>
cd Task-Manager-App
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

# Running Locally

## Start Backend Server

```bash
cd backend
npm start
```

Backend will run on:

```bash
http://localhost:5000
```

---

## Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# API Features

The backend provides REST APIs for:

- User registration
- User login authentication
- JWT token validation
- Task creation
- Task retrieval
- Task updating
- Task deletion
- Task status management

---

# Example Functionalities

Users can:

- Create daily task lists
- Track completed tasks
- Organize pending work
- Set optional deadlines
- Manage tasks from a responsive dashboard
- Maintain separate authenticated task data

---

# Future Improvements

Potential enhancements for future versions:

- Task categories and labels
- Drag-and-drop task organization
- Email reminders and notifications
- Dark mode support
- Calendar integration
- Task priority management
- Search and filtering
- Team collaboration support
- Mobile application version
- Real-time updates using WebSockets

---

# Challenges Solved

- JWT authentication implementation
- Protected backend routes
- MongoDB database integration
- Frontend-backend API communication
- State management for tasks
- Deployment of MERN applications
- Responsive UI handling

---

# Use Cases

- Daily personal task management
- Productivity tracking
- Learning full-stack MERN development
- Authentication workflow implementation
- CRUD application practice
- Portfolio project demonstration

---

# Author

Developed as a full-stack MERN project for learning, practice, and portfolio development.

---

# License

This project is intended for educational and learning purposes.
