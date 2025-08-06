export interface createFlightDTO{
    departureAerodrome: string,
    departureTime: string,
    arrivalAerodrome: string,
    arrivalTime: string,
    flightDate: string,
    aircraftRegistration: string,
    aircraftTypeId: number,
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