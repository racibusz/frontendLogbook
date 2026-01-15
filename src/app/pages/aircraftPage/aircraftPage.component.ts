import { Component, OnInit, inject, signal, WritableSignal, effect } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {MatSidenavModule} from '@angular/material/sidenav';
import {AircraftListComponent} from '../../components/aircraft/aircraftList/aircraftList.component';
import {MobileDetector} from "../../services/mobileDetector";
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AirplaneDTO } from '../../DTOs/airplaneDTO';
import {AircraftDetailsComponent} from '../../components/aircraft/aircraftDetails/aircraftDetails.component';

@Component({
    selector: 'app-aircraft-page',
    templateUrl: './aircraftPage.component.html',
    styleUrls: ['./aircraftPage.component.scss'],
    imports: [AircraftListComponent, AircraftDetailsComponent, MatSidenavModule, MatIconModule, MatButtonModule],
})
export class AircraftPageComponent implements OnInit {
    apiService: ApiService;
    aircraft:WritableSignal<AirplaneDTO[]|null> = signal(null);
    selectedAircraft:WritableSignal<AirplaneDTO|null> = signal(null);
    mobileDetector = inject(MobileDetector)
    isMobile = this.mobileDetector.isMobile;
    drawerOpened = signal(false);
    constructor(apiService: ApiService) { 
        this.apiService = apiService;
        effect(()=>{
            this.selectedAircraft()
            this.drawerOpened.set(false);
            if(this.selectedAircraft() == null){
                this.getAircraft();
            }
        })
    }
    ngOnInit(): void {
        // this.getFlights();
    }
    getAircraft(){
        this.apiService.getData("airplanes").subscribe({
            next: (data) => {
                this.aircraft.set(data);
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

}