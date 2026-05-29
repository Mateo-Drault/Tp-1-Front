process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
const { default: express } = await import('express')
const { default: gamesRouter } = await import('./routes/games.js')
const { default: authRouter } = await import('./routes/auth.js')
const { default: reviewsRouter } = await import('./routes/reviews.js')

const app = express()

// ← Agregar esto
app.use(cors({
  origin: 'http://localhost:4321',
  credentials: true
}))

app.use(express.json())

app.use('/api/games', gamesRouter)
app.use('/api/auth', authRouter)
app.use('/api/reviews', reviewsRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})