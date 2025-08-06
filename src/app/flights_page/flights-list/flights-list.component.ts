import { Component, signal, Signal } from '@angular/core';

import flights from './flights.json';
import { Flight } from './flight.interface';
import { FlightListItemComponent } from './flight-list-item/flight-list-item.component';
import { ApiService } from '../../services/api.service';
import {FlightDetailsComponent} from './flights-details/flight-details.component';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
    selector: 'app-flights-list',
    templateUrl: './flights-list.component.html',
    styleUrls: ['./flights-list.component.scss'],
    imports: [FlightListItemComponent, FlightDetailsComponent],
})
export class FlightsListComponent {
    constructor(private apiService: ApiService){}
    // selectedFlight:Flight|undefined  = undefined;
    selectedFlight = signal<Flight | undefined>(undefined);
    flights:Flight[] = [];
    unsavedChanges = signal(false);
    ngOnInit(){
        this.apiService.getData("flights").subscribe({
            next: (res)=>{ this.flights = res.flights},
            error: (err) => {throw err}
        });
    }
    flightSelected(id: number): void {
        const selectedFlight = this.flights.find(flight => flight.id === id);
        this.unsavedChanges.set(false);
        this.selectedFlight.set(selectedFlight);
    }

}