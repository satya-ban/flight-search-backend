import { Request, Response } from "express";
import db from "../config/database";
import { Flight } from "../models/Flight";
import { getDayOfWeek } from "../utils/flights.utils";


export const searchFlights = async (origin: string, destination: string, departureDate: string, passengers: number, returnDate?: string): Promise<{ departureFlights: Flight[]; returnFlights?: Flight[] }> => {

  return new Promise((resolve, reject) => {
    const departureDay = getDayOfWeek(departureDate as string);
    const returnDay = returnDate ? getDayOfWeek(returnDate) : null;

    const query = `
      SELECT * FROM flights 
      WHERE (origin = ? AND destination = ? AND availableSeats >= ?)
         OR (origin = ? AND destination = ? AND availableSeats >= ?) 
    `;

    db.all(query, returnDate
      ? [origin, destination, passengers, destination, origin, passengers]
      : [origin, destination, passengers], (err, rows: Flight[]) => {
        if (err) {
          return reject(new Error(`Database query error: ${err.message}`))
        }
        //Filter when only departure date is present
        const departureFlights = rows.filter((flight) => {
          const operationalDays = JSON.parse(flight.operationalDays as unknown as string) as number[];
          return operationalDays.includes(departureDay);
        });
        if (returnDate) {
          // Filter when return date is also present
          const returnFlights = rows.filter((flight) => {
            const operationalDays = JSON.parse(flight.operationalDays as unknown as string) as number[];
            return operationalDays.includes(returnDay!);
          });
          return resolve({ departureFlights, returnFlights })
        }
        resolve({ departureFlights })
      });
  })


};