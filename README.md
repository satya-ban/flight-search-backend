# Flight Search API

This is a simple Flight Search API built with Node.js, Express, and SQLite3. It allows users to search for available flights based on origin, destination, departure date, number of passengers, and an optional return date.

## Project Setup

### Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)

### Installation

1. **Clone the repository**:

    ```bash
    git clone <your-repo-url>
    cd <project-folder>
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up your SQLite3 database**:

    - Create or add a JSON file with the flight data in your project root directory so that SQLite3 creates a .db file with the data (e.g., `flights-data.db`).
    - Ensure the database includes a `flights` table that matches the model schema.
    - Add your test flight data in the format defined by the `flight.model.ts` file.

### Running the Application

To start the project locally, run:

```bash
npm start

The server will be running on [http://localhost:5001]

## API Routes

### 1. Search for Flights

- **Endpoint**: `GET /api/flights/search`
- **Description**: Search for flights based on the provided parameters.

#### Query Parameters:
- `origin`: Starting airport (e.g., `PNQ`)
- `destination`: Destination airport (e.g., `DEL`)
- `departureDate`: Departure date in `YYYY-MM-DD` format (e.g., `2025-02-15`)
- `passengers`: Number of passengers
- `returnDate` (Optional): Return date in `YYYY-MM-DD` format (e.g., `2025-02-20`)

#### Response:
- Returns a list of available flights that match the parameters.
- If no flights are found or there is an issue, an error message will be returned.
