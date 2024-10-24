import express from 'express'
import cors from 'cors'
import mainRouter from './src/routers/mainRouter.js'

process.loadEnvFile()

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.EXPRESS_PORT || 3000

app.listen(port, () => {
    console.log('http://localhost:' + port)
})

app.use("/api", mainRouter)

export default app