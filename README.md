# Vexocore Task Manager (Assignment Pack)

A minimal MERN app that satisfies the internship assignment:

- JWT sign-up/login
- Add, edit, delete tasks (MongoDB)
- List view with pending/completed toggle
- Backend deployable on Render/Heroku/Vercel (Node)
- Repo links + 2‑min demo script template included

## Repo structure
```
/backend   # Express API (JWT, MongoDB)
/frontend  # React UI (Vite)
```

## Submission checklist
- [ ] Public GitHub repo
- [ ] Hosted backend URL (Render)
- [ ] Demo video (≤ 2 min)
- [ ] README includes your role + tech stack

### Demo script (2 minutes)
1. 0:00 – 0:20: Overview & tech stack
2. 0:20 – 1:10: Register, login, create tasks, toggle, edit, delete
3. 1:10 – 1:40: Show code structure (auth, routes, model)
4. 1:40 – 2:00: Deployment notes + next steps (bonus ideas below)

## Bonus ideas
- Push notifications (OneSignal/FCM)
- React Native (Expo) client reusing the same API
- Clean docs: add ERD, API table, screenshots

## Deployment (Render)
1. Push to GitHub.
2. Create MongoDB Atlas free cluster. Get a connection string.
3. Create Render Web Service from `/backend` with:
   - Build: `npm install`
   - Start: `npm start`
   - Env: `MONGO_URI`, `JWT_SECRET`, `ORIGIN` (`http://localhost:5173,https://<your-frontend-domain>`)
4. Update `/frontend/.env` with `VITE_API_URL=<your-render-url>` and deploy frontend (Netlify/Vercel) if you like.
"# Task-Manager-" 
