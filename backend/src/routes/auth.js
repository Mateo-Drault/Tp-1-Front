import { Router } from 'express'
import { supabaseAnon } from '../lib/supabase.js'

const router = Router()

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password } = req.body

  const { data, error } = await supabaseAnon.auth.signUp({ email, password })

  if (error) return res.status(400).json({ error: error.message })

  res.status(201).json({
    message: 'Usuario creado. Revisá tu email para confirmar la cuenta.',
    user: data.user
  })
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const { data, error } = await supabaseAnon.auth.signInWithPassword({ email, password })

  if (error) return res.status(401).json({ error: error.message })

  res.json({
    user: data.user,
    access_token: data.session.access_token
  })
})

export default router