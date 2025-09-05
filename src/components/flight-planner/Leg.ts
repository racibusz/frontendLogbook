export class Leg {
    from?: string;
    distance?: number;
    to?: string;
    course?: number;
    magneticDeclination?: number;
    // Data provided by the user
    fuelConsumption?: number;
    magneticCourse?: number;
    groundSpeed?: number;
    windCorrection?: number;
    steerCourse?: number;
    fiveMinuteDistance?: number;
    time?: string;
    timeMinutes?: number;
    fuel?: number;
    calculateValues(windDirection: number, windSpeed: number, tas: number, fuelConsumption: number) {
        this.calculateMagneticHeading();
        this.calculateWindCorrection(windDirection, windSpeed, tas);
        this.steerCourse = this.magneticCourse! + this.windCorrection!;
        this.calculateGroundSpeed(windDirection, windSpeed, tas);
        this.fuelConsumption = fuelConsumption;
        this.calculateTime();
        // Values to calculate:
        // Time
        // Fuel
    }
    calculateTime(){
        this.timeMinutes = (Number(this.distance) / Number(this.groundSpeed)) * 60; // time in minutes
        const hours = Math.floor(this.timeMinutes / 60);
        const minutes = Math.round(this.timeMinutes % 60);
        this.time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        this.calculateFuel(this.timeMinutes);
    }
    calculateFuel(timeInMinutes:number){
        this.fuel = Math.ceil(this.fuelConsumption! * (timeInMinutes / 60));
    }
    calculateMagneticHeading(){
        this.magneticCourse = Number(this.course!) + Number(this.magneticDeclination!);
    }
    calculateWindCorrection(windDirection: number, windSpeed: number, tas: number){
        const angleDiff = windDirection - this.magneticCourse!; // Assuming the wind is given in magnetic degrees
        const windCorrectionAngle = Math.sin((windSpeed * Math.sin(angleDiff * Math.PI/180))/tas) * (180/Math.PI);
        this.windCorrection = Math.round(windCorrectionAngle);
    }
    calculateGroundSpeed(windDirection: number, windSpeed: number, tas: number){
        const angleDiff = windDirection - this.magneticCourse!; // Assuming the wind is given in magnetic degrees
        const headWindComponent = Number(windSpeed) * Math.cos(angleDiff * Math.PI/180);
        this.groundSpeed = Math.round(Number(tas) - Number(headWindComponent));
        this.fiveMinuteDistance = Math.round(Number(this.groundSpeed!) / 12); // 60 minutes / 5 minutes = 12
    }
    setValue(field: string, val: any) {
        (this as any)[field] = val;
    }
}