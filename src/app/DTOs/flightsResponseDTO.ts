import { FlightDTO } from "./flightDTO";

export interface FlightsResponseDTO {
    flights: FlightDTO[];
    presentPage: number;
    totalPages: number;
    userId: number;
}