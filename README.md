# Task Manager App

A **full-stack MERN application** for managing tasks with authentication and CRUD features.

---

##  Features
- **User Authentication** – Sign up & login with JWT.
- **Task Management** – Add, edit, and delete tasks stored in MongoDB.
- **Task Filters** – Toggle between pending and completed tasks.
- **Responsive UI** – Built with React (Vite).
- **Deployment Ready** – Works on Render/Netlify/Vercel.

---

##  Project Structure
/backend # Express.js API (JWT Auth, MongoDB)
/frontend # React UI (Vite + Axios)

---

##  Tech Stack
- **Frontend**: React (Vite), Axios, Tailwind CSS
- **Backend**: Node.js, Express.js, JWT
- **Database**: MongoDB Atlas
- **Deployment**: Render (Backend), Netlify/Vercel (Frontend)

---

##  Deployment Guide

### **Backend on Render**
1. Push your code to **GitHub**.
2. Create a **MongoDB Atlas** cluster and copy the connection string.
3. Create a **Render Web Service** from `/backend`:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     ```
     MONGO_URI=<Your MongoDB URI>
     JWT_SECRET=<Your Secret>
     ORIGIN=http://localhost:5173,https://your-frontend-domain
     ```

### **Frontend on Netlify/Vercel**
- Update `/frontend/.env`:
VITE_API_URL=<Your Render backend URL>


- Deploy via **Netlify** or **Vercel**.

---

##  Screenshots
*(Add your app screenshots here for better presentation.)*

---

##  Author
Developed using the **MERN stack** for task management with a secure and scalable architecture.
