import "dotenv/config"
import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { PORT } from "./config/env"
import { initializeDatabase } from "./config/database"
import flightRouter from "./routes/flight.route"

const app = express();

app.use(json());
app.use(urlencoded({extended: true}));
app.use(cors({origin: "*", credentials: true}));

app.use('/api/flights',flightRouter);

app.listen(PORT, async() => {
    await initializeDatabase();
    console.log(`App started at http://localhost:${PORT} in developement!`);
})