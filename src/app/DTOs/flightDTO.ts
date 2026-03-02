import { AirplaneDTO } from "./airplaneDTO";
import {AirportDTO} from './airportDTO';
import { FlightRouteDTO } from "./flightRouteDTO";

export interface FlightDTO {
    id: number;
    userId: number;
    departureAerodrome: AirportDTO;
    arrivalAerodrome: AirportDTO;
    departureTime: Date;
    arrivalTime: Date;
    flightDate: Date;
    aircraft: AirplaneDTO;
    SinglePilotSeTime: string;
    SinglePilotMeTime: string;
    multiPilotTime: string;
    totalTime: string;
    picName: string;
    landingsDay: number;
    landingsNight: number;
    flightConditionNightTime: string;
    flightConditionIfrTime: string;
    picTime: string;
    copilotTime: string;
    dualTime: string;
    instructorTime: string;
    remarks: string;
    flightRoute: FlightRouteDTO;
}