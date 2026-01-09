import { Component, OnInit, inject, signal, WritableSignal } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {FlightDTO} from "../../DTOs/flightDTO";
import {FlightListComponent} from '../../components/flights/flightList/flightList.component';
import { FlightDetailsComponent } from '../../components/flights/flightDetails/flightDetails.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MobileDetector} from "../../services/mobileDetector";
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-flights-page',
    templateUrl: './flightsPage.component.html',
    styleUrls: ['./flightsPage.component.scss'],
    imports: [FlightListComponent, FlightDetailsComponent, MatSidenavModule, MatIconModule, MatButtonModule],
})
export class FlightsPageComponent implements OnInit {
    apiService: ApiService;
    flights:WritableSignal<FlightDTO[]|null> = signal(null);
    selectedFlight:WritableSignal<FlightDTO|null> = signal(null);
    mobileDetector = inject(MobileDetector)
    isMobile = this.mobileDetector.isMobile;
    drawerOpened = signal(false);
    constructor(apiService: ApiService) { 
        this.apiService = apiService;
    }
    ngOnInit(): void {
        this.getFlights();
    }
    getFlights(){
        this.apiService.getData("flights").subscribe({
            next: (data) => {
                this.flights.set(data.flights);
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

}