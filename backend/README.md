# Vexocore Task Manager — Backend (Express + MongoDB + JWT)

## Quick start
```bash
cd backend
npm install
cp .env.example .env
# Fill MONGO_URI and JWT_SECRET in .env
npm run dev
```

## API
- `POST /api/auth/register` { name, email, password }
- `POST /api/auth/login` { email, password }
- `GET /api/tasks` (auth)
- `POST /api/tasks` { title, description?, dueDate? } (auth)
- `PUT /api/tasks/:id` (auth)
- `DELETE /api/tasks/:id` (auth)
- `POST /api/tasks/:id/toggle` (auth)

## Deploy (Render)
1. Create a new **Web Service** from this `backend` folder's repo.
2. Build command: `npm install`
3. Start command: `npm start`
4. Add env vars: `MONGO_URI`, `JWT_SECRET`, `ORIGIN` (your frontend URL).
