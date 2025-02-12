export interface Flight {
    id?: number;
    airline: string;
    airlineCode: string;
    flightNumber: number;
    origin: string;
    destination: string;
    availableSeats: number;
    price: number;
    departure: string;
    arrival: string;
    duration: string;
    operationalDays: number[];
  }
  