import { AircraftTypeInterface } from "../flights-list/aircraftType.interface";

export interface AircraftDTO{
    id: number,
    registration: string,
    aircraftType: AircraftTypeInterface
}