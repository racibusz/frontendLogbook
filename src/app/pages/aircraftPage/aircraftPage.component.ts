import { Component, OnInit, inject, signal, WritableSignal, effect } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MobileDetector} from "../../services/mobileDetector";
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AirplaneDTO } from '../../DTOs/airplaneDTO';
import {ItemListComponent} from "../../components/items/itemListComponent/itemList.component";
import {ItemDetailsComponent} from "../../components/items/itemDetailsComponent/itemDetails.component";
import {DetailsSections, ListSections} from './sections';

@Component({
    selector: 'app-aircraft-page',
    templateUrl: './aircraftPage.component.html',
    styleUrls: ['./aircraftPage.component.scss'],
    imports: [ItemListComponent, ItemDetailsComponent, MatSidenavModule, MatIconModule, MatButtonModule],
})
export class AircraftPageComponent implements OnInit {
    apiService: ApiService;
    aircraft:WritableSignal<AirplaneDTO[]|null> = signal(null);
    selectedAircraft:WritableSignal<AirplaneDTO|null> = signal(null);
    mobileDetector = inject(MobileDetector)
    isMobile = this.mobileDetector.isMobile;
    drawerOpened = signal(false);

    listSections = new ListSections();;
    detailsSections = new DetailsSections();

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
                this.aircraft.set(data as AirplaneDTO[]);
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

}