import sqlite3 from "sqlite3";
import path from "path"
import fs from "fs"

// Define the Flight type to type the data from the JSON file
interface Flight {
  flightNumber: string;
  departure: string;
  arrival: string;
  date: string;
}

const dbPath = path.join(__dirname,"../../flights.db");

//Connect to the database
const connectDB = (): sqlite3.Database => {
  return new sqlite3.Database(dbPath, (err:any) => {
    if(err) {
      console.error(`Database connection error: ${err.message}`)
    } else {
      console.log(`Connected to database`)
    }
  });
}

//Intialize the DB and create table if it does not exist
export const intializeDB = async (): Promise<any> => {
  const db = connectDB();

  db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS flights (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        airline TEXT NOT NULL,
        airlineCode TEXT NOT NULL,
        flightNumber INTEGER NOT NULL,
        origin TEXT NOT NULL,
        destination TEXT NOT NULL,
        availableSeats INTEGER NOT NULL,
        price INTEGER NOT NULL,
        departure TEXT NOT NULL,
        arrival TEXT NOT NULL,
        duration TEXT NOT NULL,
        operationalDays TEXT NOT NULL
      )
            
    `);

    //Check if data exists
    const countFlights = db.get(`SELECT COUNT(*) as count FROM flights`, (err: any, row: any) => {
      if (err) {
        console.error("Error checking data:", err.message);
        return;
      }

      if (row.count === 0) {
        const testDataPath = path.join(__dirname, "../../flights-data.json");
        const testFlights = JSON.parse(fs.readFileSync(testDataPath, "utf-8"));

        const insertQuery = `
          INSERT INTO flights (airline, airlineCode, flightNumber, origin, destination, availableSeats, price, departure, arrival, duration, operationalDays)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const stmt = db.prepare(insertQuery);
        for (const flight of testFlights) {
          stmt.run([
            flight.airline,
            flight.airlineCode,
            flight.flightNumber,
            flight.origin,
            flight.destination,
            flight.availableSeats,
            flight.price,
            flight.departure,
            flight.arrival,
            flight.duration,
            JSON.stringify(flight.operationalDays),
          ]);
        }
        stmt.finalize();
        console.log("Test flight data inserted into database.");
      }

    })

  });
}