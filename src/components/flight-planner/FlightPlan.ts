import { Leg } from "./Leg";
export interface FlightPlan {
    id: string;
    flightId: number;
    windSpeed: number;
    windDirection: number;
    tas: number;
    fuelConsumption: number;
    legs?: Leg[];
}