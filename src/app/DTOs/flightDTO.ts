import { AirplaneDTO } from "./airplaneDTO";

export interface FlightDTO {
    id: number;
    userId: number;
    departureAerodrome: string;
    arrivalAerodrome: string;
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
}