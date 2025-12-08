export interface Flight{
    id: number;
    userId: number;
    departureAerodrome: string;
    arrivalAerodrome: string;
    departureTime: Date;
    arrivalTime: Date;
    flightDate: Date;
    aircraft: {
        id: number;
        aircraftType: {
            id: number;
            model: string;
            type: string;
            category: string;
        };
        registration: string;
    };
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