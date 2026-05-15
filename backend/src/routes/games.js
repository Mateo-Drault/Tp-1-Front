import { Router } from 'express'
import axios from 'axios'

const router = Router()
const RAWG_BASE = 'https://api.rawg.io/api'

// GET /api/games?search=zelda&page=1
router.get('/', async (req, res) => {
  const { search = '', page = 1 } = req.query

  const { data } = await axios.get(`${RAWG_BASE}/games`, {
    params: {
      key: process.env.RAWG_API_KEY,
      search,
      page,
      page_size: 20
    }
  })

  res.json({
    count: data.count,
    next: data.next,
    results: data.results.map(game => ({
      id: game.id,
      name: game.name,
      released: game.released,
      rating: game.rating,
      image: game.background_image,
      genres: game.genres.map(g => g.name)
    }))
  })
})

// GET /api/games/:id
router.get('/:id', async (req, res) => {
  const { data } = await axios.get(`${RAWG_BASE}/games/${req.params.id}`, {
    params: { key: process.env.RAWG_API_KEY }
  })

  res.json({
    id: data.id,
    name: data.name,
    description: data.description_raw,
    released: data.released,
    rating: data.rating,
    image: data.background_image,
    genres: data.genres.map(g => g.name),
    platforms: data.platforms.map(p => p.platform.name),
    developers: data.developers.map(d => d.name)
  })
})

export default router