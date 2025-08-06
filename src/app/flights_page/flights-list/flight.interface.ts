import { AircraftTypeInterface } from "./aircraftType.interface"

export interface Flight{
    id: number,
    userId: number,
    departureAerodrome: string,
    arrivalAerodrome: string,
    departureTime: string,
    arrivalTime: string,
    flightDate: string,
    aircraft: {
        id: number,
        aircraftType: AircraftTypeInterface,
        registration: string
    }
    SinglePilotSeTime: string,
    SinglePilotMeTime: string,
    multiPilotTime: string,
    totalTime: string,
    picName: string,
    landingsDay: number,
    landingsNight: number,
    flightConditionNightTime: string,
    flightConditionIfrTime: string,
    picTime: string,
    copilotTime: string,
    dualTime: string,
    instructorTime: string,
    remarks: string
}