import { Router } from 'express'
import { supabaseAnon } from '../lib/supabase.js'
import { requireAuth } from '../middleware/auth.js'
import { createClient } from '@supabase/supabase-js'

const router = Router()

// GET /api/reviews/:gameId — público
router.get('/:gameId', async (req, res) => {
  const { data, error } = await supabaseAnon
    .from('reviews')
    .select('*')
    .eq('game_id', req.params.gameId)
    .order('created_at', { ascending: false })

  if (error) return res.status(500).json({ error: error.message })

  res.json(data)
})

// POST /api/reviews — requiere login
router.post('/', requireAuth, async (req, res) => {
  const { game_id, rating, comment } = req.body

  // Cliente con el token del usuario para que funcionen las RLS policies
  const supabaseUser = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      global: {
        headers: { Authorization: req.headers.authorization }
      }
    }
  )

  const { data, error } = await supabaseUser
    .from('reviews')
    .insert({
      user_id: req.user.id,
      game_id,
      rating,
      comment
    })
    .select()
    .single()

  if (error) return res.status(400).json({ error: error.message })

  res.status(201).json(data)
})

export default router