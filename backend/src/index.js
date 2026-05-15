import dotenv from 'dotenv'
dotenv.config()

const { default: express } = await import('express')
const { default: gamesRouter } = await import('./routes/games.js')
const { default: authRouter } = await import('./routes/auth.js')
const { default: reviewsRouter } = await import('./routes/reviews.js')

const app = express()
app.use(express.json())

app.use('/api/games', gamesRouter)
app.use('/api/auth', authRouter)
app.use('/api/reviews', reviewsRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})