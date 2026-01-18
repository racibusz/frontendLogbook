import {AirplaneTypeDTO} from './airplaneTypeDTO';
import {FlightDTO} from './flightDTO';
import {UserDTO} from './userDTO';

export interface AirplaneDTO {
    id: number;
    aircraftType: AirplaneTypeDTO;
    flights: FlightDTO[];
    pricePerHour: number;
    registration: string;
    owner: UserDTO;
    canEdit?:boolean;
}