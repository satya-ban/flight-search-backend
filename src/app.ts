import "dotenv/config"
import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { PORT } from "./config/env"
import { intializeDB } from "./config/database"

const app = express()

app.use(json())
app.use(urlencoded({extended: true}))
app.use(cors({origin: "*", credentials: true}))

// app.use("/api",UserRouter)
// app.use("/api/card",scratchCardRoute)
// app.use('/api/transaction',transactionRoute)

app.listen(PORT, async() => {
    await intializeDB()
    console.log(`App started at localhost:${PORT} in developement!`)
})