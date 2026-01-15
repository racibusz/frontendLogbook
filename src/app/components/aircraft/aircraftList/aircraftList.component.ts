import { Component, Signal, Input, WritableSignal, effect } from '@angular/core';
import { FlightDTO } from '../../../DTOs/flightDTO';
import {SingleAircraftComponent} from '../singleAircraftComponent/singleAircraft.component';
import {ShimmeringListComponent} from './shimmeringList/shimmeringList.component';
import { AirplaneDTO } from '../../../DTOs/airplaneDTO';

@Component({
    selector: 'app-aircraft-list',
    templateUrl: './aircraftList.component.html',
    styleUrls: ['./aircraftList.component.scss'],
    imports: [SingleAircraftComponent, ShimmeringListComponent]
})
export class AircraftListComponent {
    @Input() aircraft!: WritableSignal<AirplaneDTO[]|null>;
    @Input() selectedAircraft!: WritableSignal<AirplaneDTO|null>;

    constructor() {
        // Initialize flights or fetch from a service

    }

    // Add methods to handle flight data
}