import { Component, Signal } from '@angular/core';
import { Input, WritableSignal } from '@angular/core';
import { FlightDTO } from '../../../DTOs/flightDTO';
import {SingleFlightComponent} from '../singleFlight/singleFlight.component';

@Component({
    selector: 'app-flight-list',
    templateUrl: './flightList.component.html',
    styleUrls: ['./flightList.component.scss'],
    imports: [SingleFlightComponent]
})
export class FlightListComponent {
    @Input() flights!: WritableSignal<FlightDTO[]|null>;
    @Input() selectedFlight!: WritableSignal<FlightDTO|null>;

    constructor() {
        // Initialize flights or fetch from a service
    }

    // Add methods to handle flight data
}