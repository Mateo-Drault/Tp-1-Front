import express from 'express'
import dotenv from 'dotenv'
import gamesRouter from './routes/games.js'
import authRouter from './routes/auth.js'
import reviewsRouter from './routes/reviews.js'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/api/games', gamesRouter)
app.use('/api/auth', authRouter)
app.use('/api/reviews', reviewsRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})