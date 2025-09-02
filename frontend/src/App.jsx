import React, { useEffect, useState } from 'react'
import './app.css'

const API_URL = import.meta.env.VITE_API_URL || 'https://task-manager-backend-u8vs.onrender.com';

function useAuth() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'))

  function saveAuth(t, u) {
    localStorage.setItem('token', t)
    localStorage.setItem('user', JSON.stringify(u))
    setToken(t)
    setUser(u)
  }

  function logout() {
    localStorage.clear()
    setToken('')
    setUser(null)
  }

  return { token, user, saveAuth, logout }
}

async function api(path, method = 'GET', body, token = '') {
  const res = await fetch(API_URL + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  })
  if (!res.ok) throw new Error((await res.json()).message || 'Request failed')
  return res.json()
}

export default function App() {
  const { token, user, saveAuth, logout } = useAuth()
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState({ title: '', description: '', dueDate: '' })
  const [auth, setAuth] = useState({ name: '', email: '', password: '' })
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) return
    api('/api/tasks', 'GET', null, token)
      .then(setTasks)
      .catch((e) => setError(e.message))
  }, [token])

  async function handleAuth(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const path = mode === 'register' ? '/api/auth/register' : '/api/auth/login'
      const payload =
        mode === 'register' ? auth : { email: auth.email, password: auth.password }
      const data = await api(path, 'POST', payload)
      saveAuth(data.token, data.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function createTask(e) {
    e.preventDefault()
    try {
      const t = await api('/api/tasks', 'POST', form, token)
      setTasks([t, ...tasks])
      setForm({ title: '', description: '', dueDate: '' })
    } catch (err) {
      setError(err.message)
    }
  }

  async function toggleTask(id) {
    try {
      const t = await api(`/api/tasks/${id}/toggle`, 'POST', null, token)
      setTasks(tasks.map((x) => (x._id === id ? t : x)))
    } catch (err) {
      setError(err.message)
    }
  }

  async function updateTask(id, updates) {
    try {
      const t = await api(`/api/tasks/${id}`, 'PUT', updates, token)
      setTasks(tasks.map((x) => (x._id === id ? t : x)))
    } catch (err) {
      setError(err.message)
    }
  }

  async function deleteTask(id) {
    try {
      await api(`/api/tasks/${id}`, 'DELETE', null, token)
      setTasks(tasks.filter((x) => x._id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  if (!token) {
    return (
      <div className="container">
        <div className="card">
          <h1>Vexocore Task Manager</h1>
          <p className="small">Organize your work and personal tasks in one place. Secure login, create tasks, set due dates, and stay productive.</p>
          {error && <p style={{ color: 'crimson' }}>{error}</p>}
          <form onSubmit={handleAuth} className="row">
            {mode === 'register' && (
              <input
                placeholder="Name"
                value={auth.name}
                onChange={(e) => setAuth({ ...auth, name: e.target.value })}
                required
              />
            )}
            <input
              placeholder="Email"
              type="email"
              value={auth.email}
              onChange={(e) => setAuth({ ...auth, email: e.target.value })}
              required
            />
            <input
              placeholder="Password"
              type="password"
              value={auth.password}
              onChange={(e) => setAuth({ ...auth, password: e.target.value })}
              required
            />
            <button disabled={loading}>{mode === 'register' ? 'Create account' : 'Login'}</button>
            <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
              {mode === 'login' ? 'Need an account?' : 'Have an account?'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="card row" style={{ justifyContent: 'space-between' }}>
        <h1>Tasks</h1>
        <div className="row">
          <span className="small">Signed in as {user?.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      {error && <div className="card" style={{ color: 'crimson' }}>{error}</div>}

      <div className="card">
        <form onSubmit={createTask} className="row" style={{ alignItems: 'stretch' }}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            placeholder="Due date (YYYY-MM-DD)"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
          />
          <button>Add</button>
        </form>
      </div>

      <div className="card">
        {tasks.length === 0 && <p className="small">No tasks yet. Add one!</p>}
        {tasks.map((t) => (
          <div key={t._id} className={'task ' + (t.completed ? 'done' : '')}>
            <div>
              <strong>{t.title}</strong>
              {t.description && <div className="small">{t.description}</div>}
              {t.dueDate && <div className="small">Due {new Date(t.dueDate).toLocaleDateString()}</div>}
              <div className="small">Created {new Date(t.createdAt).toLocaleString()}</div>
            </div>
            <div className="actions">
              <button onClick={() => toggleTask(t._id)}>
                {t.completed ? 'Mark pending' : 'Mark done'}
              </button>
              <button
                onClick={() => {
                  const title = prompt('New title', t.title) || t.title
                  const description = prompt('New description', t.description || '') || t.description
                  updateTask(t._id, { title, description })
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteTask(t._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}