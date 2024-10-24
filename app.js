import express from 'express'
import cors from 'cors'
import jsonParseErrorHandler from './src/untils/errorHandling.js'
import mainRouter from './src/routers/mainRouter.js'

process.loadEnvFile()

const app = express()
app.use(cors())
app.use(express.json())
app.use(jsonParseErrorHandler)

const port = process.env.EXPRESS_PORT || 3000

app.listen(port, () => {
    console.log('http://localhost:' + port)
})

app.use("/api", mainRouter)

export default app