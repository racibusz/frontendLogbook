import { Component, Signal, Input, WritableSignal, effect } from '@angular/core';
import { FlightDTO } from '../../../DTOs/flightDTO';
import {SingleFlightComponent} from '../singleFlight/singleFlight.component';
import {ShimmeringListComponent} from './shimmeringList/shimmeringList.component';

@Component({
    selector: 'app-flight-list',
    templateUrl: './flightList.component.html',
    styleUrls: ['./flightList.component.scss'],
    imports: [SingleFlightComponent, ShimmeringListComponent]
})
export class FlightListComponent {
    @Input() flights!: WritableSignal<FlightDTO[]|null>;
    @Input() selectedFlight!: WritableSignal<FlightDTO|null>;

    constructor() {
        // Initialize flights or fetch from a service

    }

    // Add methods to handle flight data
}