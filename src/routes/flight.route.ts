import { Router } from "express";
import { getFlightsController } from "../controllers/flight.controller";
import { validateSearch } from "../middlewares/validation.middleware";

const flightRouter = Router()


flightRouter.get('/search', validateSearch, getFlightsController)

export default flightRouter;