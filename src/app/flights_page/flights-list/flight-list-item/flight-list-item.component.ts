import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { signal } from "@angular/core";
import { Flight } from "../flight.interface";

@Component({
    selector: "li[flight-list-item]",
    templateUrl: "./flight-list-item.component.html",
    standalone: true
})
export class FlightListItemComponent {
    @Input() flight: any;
    isFlightScheduled = signal<boolean>(false);

    determineScheduled(){
        const today = new Date();
        const flightDate = new Date(`${this.flight.flightDate} ${this.flight.arrivalTime}`);

        this.isFlightScheduled.set(flightDate.getTime() > today.getTime());
    }
    ngOnInit(){
        this.determineScheduled();
    }
}