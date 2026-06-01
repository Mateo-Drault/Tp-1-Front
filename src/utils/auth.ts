const API_URL = 'https://api-tp2-frontend-production.up.railway.app/api'

export interface AuthUser {
  id: string
  email: string
}

export interface AuthResponse {
  user: AuthUser
  access_token: string
}

export async function register(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error)
  }

  return res.json()
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error)
  }

  const data = await res.json()
  localStorage.setItem('checkpoint_token', data.access_token)
  localStorage.setItem('checkpoint_user', JSON.stringify(data.user))
  return data
}

export function logout(): void {
  localStorage.removeItem('checkpoint_token')
  localStorage.removeItem('checkpoint_user')
}

export function getToken(): string | null {
  return localStorage.getItem('checkpoint_token')
}

export function getUser(): AuthUser | null {
  const user = localStorage.getItem('checkpoint_user')
  return user ? JSON.parse(user) : null
}