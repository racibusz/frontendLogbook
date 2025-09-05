import { Leg } from "./Leg";
export class FlightPlan {
    id: string;
    flightId: number;
    windSpeed: number;
    windDirection: number;
    tas: number;
    fuelConsumption: number;
    legs?: Leg[];
    constructor() {
        this.id = '';
        this.flightId = 0;
        this.windSpeed = 0;
        this.windDirection = 0;
        this.tas = 0;
        this.fuelConsumption = 0;
        this.legs = [];
    }
    summarizeValues(): { totalDistance: number; totalTime: string; totalFuel: number }
    {
        if(!this.legs || this.legs.length === 0) {
            return { totalDistance: 0, totalTime: "00:00", totalFuel: 0 };
        }
        let totalDistance = 0;
        let totalTimeMinutes = 0;
        let totalFuel = 0;
        this.legs.forEach(leg => {
            totalDistance += Number(leg.distance) ?? 0;
            totalTimeMinutes += leg.timeMinutes ?? 0;
            totalFuel += leg.fuel ?? 0;
        });
        const hours = Math.floor(totalTimeMinutes / 60);
        const minutes = Math.round(totalTimeMinutes % 60);
        const totalTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return { totalDistance, totalTime, totalFuel };
    }
}