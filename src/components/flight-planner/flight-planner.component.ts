import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { signal, Signal, computed, WritableSignal } from "@angular/core";
import { Flight } from "../../app/flights_page/flights-list/flight.interface";
import {DecimalPipe} from "@angular/common";
import { Leg } from "./Leg";
import { FlightPlan } from "./FlightPlan";
import { from } from "rxjs";
@Component({
    selector: "flight-planner",
    templateUrl: "./flight-planner.component.html",
    standalone: true,
    imports: [DecimalPipe],
})
export class FlightPlannerComponent {
    @Input() flight!: WritableSignal<Flight | undefined>;
    flightPlan: WritableSignal<FlightPlan> = signal({} as FlightPlan);
    summary = signal({ totalDistance: 0, totalTime: "00:00", totalFuel: 0 });
    currentLeg: WritableSignal<Leg> = signal(new Leg());
    // The plan:
    // Just calculate everything here, then pass the data to the backend
    setValue(field: string, val: any) {
        this.flightPlan.update(plan => {
            const updatedPlan = new FlightPlan();
            Object.assign(updatedPlan, plan, { [field]: val });
            return updatedPlan;
        });

        this.flightPlan().legs?.forEach(leg => {
            leg.calculateValues(this.flightPlan().windDirection, this.flightPlan().windSpeed, this.flightPlan().tas, this.flightPlan().fuelConsumption);
        });
        this.flightPlan.set(this.flightPlan());
    }
    setLegValue(field: string, val: any) {
        this.currentLeg().setValue(field, val);
        this.currentLeg.set(this.currentLeg());
    }
    addLeg() {
        this.currentLeg().calculateValues(
            this.flightPlan().windDirection,
            this.flightPlan().windSpeed,
            this.flightPlan().tas,
            this.flightPlan().fuelConsumption
        );
        this.currentLeg.set(this.currentLeg());

        this.flightPlan.update(plan => {
            const updatedPlan = new FlightPlan();
            Object.assign(updatedPlan, plan, {
                legs: [...(plan.legs ?? []), this.currentLeg()]
            });
            return updatedPlan;
        });

        this.currentLeg.set(new Leg());
        this.flightPlan().summarizeValues();
        this.flightPlan.set(this.flightPlan());
        this.summary.set(this.flightPlan().summarizeValues());
    }
}