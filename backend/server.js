import express from 'express'
import dotenv from 'dotenv'
import 'colors'
import cors from 'cors'
import bodyParser from 'body-parser'
import { db } from './utils/db.js'
import userRouter from './routes/userRoute.js'

// cofiguration
db.connect((err) => {
    if (err) {
        console.log('Database Connection error'.bgRed.white, err)
        return
    }
    console.log('Mysql conneced')
})
dotenv.config()
// object
const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
// routes
app.get('/', (req, res) => {
    res.send('<h1>Hello World !</h1>')
})
app.use('/api/v1', userRouter)

// Port
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgMagenta.white)
})