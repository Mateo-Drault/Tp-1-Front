import { Router } from 'express'
import axios from 'axios'

const router = Router()
const RAWG_BASE = 'https://api.rawg.io/api'

// GET /api/games?search=zelda&page=1
router.get('/', async (req, res) => {
  const { search = '', page = 1 } = req.query

  try {
    const { data } = await axios.get(`${RAWG_BASE}/games`, {
      params: {
        key: process.env.RAWG_API_KEY,
        search,
        page,
        page_size: 20
      }
    })

    // Ejecutamos todas las peticiones a SteamGridDB en paralelo
    const optimizedResults = await Promise.all(
      data.results.map(async (game) => {
        let coverUrl = null;

        try {
          const cover_request = await axios.post("https://www.steamgriddb.com/api/public/search/main/games", {
            "asset_type": "grid",
            "term": game.name,
            "offset": 0,
            "filters": { "styles": ["all"], "languages": ["all"], "dimensions": ["all"], "formats": ["all"], "order": "score_desc", "game_id": [], "static": true, "animated": false, "nsfw": true, "epilepsy": true, "humor": true, "untagged": true, "type": ["all"] }
          })

          // El uso de ?. evita que el servidor explote si games o assets vienen vacíos
          coverUrl = cover_request.data?.data?.games?.[0]?.assets?.[0]?.thumb || null;
        } catch (error) {
          // Si falla la petición de un juego en particular, registramos el error pero no frenamos el flujo
          console.error(`Error obteniendo portada para: ${game.name}`);
        }

        // Devolvemos el objeto ya formateado con los campos que necesitas
        return {
          id: game.id,
          name: game.name,
          released: game.released,
          rating: game.rating,
          image: game.background_image,
          cover: coverUrl,
          genres: game.genres ? game.genres.map(g => g.name) : []
        }
      })
    )

    // Enviamos la respuesta exactamente con la misma estructura que tenías
    res.json({
      count: data.count,
      next: data.next,
      results: optimizedResults
    })

  } catch (error) {
    console.error("Error general en el endpoint:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
})

// GET /api/games/:id
router.get('/:id', async (req, res) => {
  const { data } = await axios.get(`${RAWG_BASE}/games/${req.params.id}`, {
    params: { key: process.env.RAWG_API_KEY }
  })

  const cover_request = await axios.post("https://www.steamgriddb.com/api/public/search/main/games", {
    "asset_type": "grid",
    "term": data.name,
    "offset": 0,
    "filters": { "styles": ["all"], "languages": ["all"], "dimensions": ["all"], "formats": ["all"], "order": "score_desc", "game_id": [], "static": true, "animated": false, "nsfw": true, "epilepsy": true, "humor": true, "untagged": true, "type": ["all"] }
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
    developers: data.developers.map(d => d.name),
    cover: cover_request.data.data.games[0].assets[0].thumb
  })
})

export default router