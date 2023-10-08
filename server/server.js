import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
import cors from 'cors'

// import the router from your routes file
import drinksRouter from './routes/drinks.js'
import milksRouter from './routes/milks.js'
import spicesRouter from './routes/spices.js'
import syrupsRouter from './routes/syrups.js'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use(cors())

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'lightning.png')))
    app.use(express.static('public'))
}

// specify the api path for the server to use
app.use('/drinks', drinksRouter)
app.use('/milks', milksRouter)
app.use('/spices', spicesRouter)
app.use('/syrups', syrupsRouter)

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})