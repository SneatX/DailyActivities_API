import express from 'express'
import cors from 'cors'

process.loadEnvFile()

const app = express()
app.use(cors())

const port = process.env.EXPRESS_PORT || 3000

app.listen(port, () => {
    console.log('http://localhost:' + port)
})

app.use("/", (req, res) => {
    res.send("Hello World!")
})

export default app