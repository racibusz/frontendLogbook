import { Component, OnInit, inject, signal, WritableSignal, effect } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {FlightDTO} from "../../DTOs/flightDTO";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MobileDetector} from "../../services/mobileDetector";
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FlightListComponent} from '../../components/flights/flightList/flightList.component';
import { FlightDetailsComponent } from '../../components/flights/flightDetails/flightDetails.component';
import {ItemListComponent} from "../../components/items/itemListComponent/itemList.component";
import { ItemListDTO } from '../../DTOs/itemListDTO';
import {ItemDetailsComponent} from '../../components/items/itemDetailsComponent/itemDetails.component'
import { DetailsDTO } from '../../DTOs/detailsDTO';

@Component({
    selector: 'app-flights-page',
    templateUrl: './flightsPage.component.html',
    styleUrls: ['./flightsPage.component.scss'],
    imports: [ItemListComponent, ItemDetailsComponent, FlightDetailsComponent, MatSidenavModule, MatIconModule, MatButtonModule],
})
export class FlightsPageComponent {
    apiService: ApiService;
    flights:WritableSignal<FlightDTO[]|null> = signal(null);
    selectedFlight:WritableSignal<FlightDTO|null> = signal(null);
    mobileDetector = inject(MobileDetector)
    isMobile = this.mobileDetector.isMobile;
    drawerOpened = signal(false);

    detailsSections: DetailsDTO = {
        sections: [
    {
      title: "Samolot",
      iconName: "airplanemode_active",
      table: [
        { th: "Rejestracja", td: "{{aircraft.registration}}", editable: true, format: "UPPERCASE" },
        { th: "Typ ICAO", td: "{{aircraft.aircraftType.type}}", editable: false, format: null},
        { th: "Model", td: "{{aircraft.aircraftType.model}}", editable: false, format: null },
        { th: "Kategoria", td: "{{aircraft.aircraftType.category}}", editable: false, format: null }
      ]
    },
    {
      title: "Data, Czas",
      iconName: "access_time",
      table: [
        {
          th: "Data",
          td: "{{flightDate}}", 
          format: "^(\\d{0,4}|\\d{4}-\\d{0,2}|\\d{4}-\\d{2}-\\d{0,2})$",
          editable: true
        },
        {
          th: "Start",
          td: "{{departureTime}}",
          format: "^([0-9]{0,2}|[0-9]{2}:{1}[0-9]{0,2})$",
          editable: true
        },
        {
          th: "Lądowanie",
          td: "{{arrivalTime}}",
          format: "^([0-9]{0,2}|[0-9]{2}:{1}[0-9]{0,2})$",
          editable: true
        },
        {
          th: "Czas lotu",
          td: "{{totalTime}}",
          format: "^([0-9]{0,2}|[0-9]{2}:{1}[0-9]{0,2})$",
          editable: true
        }
      ]
    },
    {
      title: "Trasa",
      iconName: "map",
      table: [
        { th: "Start", td: "{{departureAerodrome}}", editable: true, format: null },
        { th: "Lądowanie", td: "{{arrivalAerodrome}}", editable: true, format: null },
        // { th: "Model", td: "aircraft.aircraftType.model", editable: false, format: null },
        // { th: "Kategoria", td: "aircraft.aircraftType.category", editable: false, format: null }
      ]  
    },
    {
      title: "Lądowania",
      iconName: "flight_landing",
      table: [
        { th: "Dzienne", td: "{{landingsDay}}", editable: true, format: null },
        { th: "Nocne", td: "{{landingsNight}}", editable: true, format: null },
        // { th: "Model", td: "aircraft.aircraftType.model", editable: false, format: null },
        // { th: "Kategoria", td: "aircraft.aircraftType.category", editable: false, format: null }
      ]  
    },
    {
      title: "PIC",
      iconName: "perm_identity",
      table: [
        { th: "PIC", td: "{{picName}}", editable: true, format: null },
        // { th: "Model", td: "aircraft.aircraftType.model", editable: false, format: null },
        // { th: "Kategoria", td: "aircraft.aircraftType.category", editable: false, format: null }
      ]  
    },
    {
      title: "Notatki",
      iconName: "notes",
      table: [
        { th: "REMARKS", td: "{{remarks}}", editable: true, format: null },
        // { th: "Model", td: "aircraft.aircraftType.model", editable: false, format: null },
        // { th: "Kategoria", td: "aircraft.aircraftType.category", editable: false, format: null }
      ]  
    },
    {
      title: "Podział czasu",
      iconName: "timeline",
      table: [
        {
          th: "PIC",
          td: "{{picTime}}", 
          format: "^([0-9]{0,2}|[0-9]{2}:{1}[0-9]{0,2})$",
          editable: true
        },
        {
          th: "Co-pilot",
          td: "{{copilotTime}}",
          format: "^([0-9]{0,2}|[0-9]{2}:{1}[0-9]{0,2})$",
          editable: true
        },
        {
          th: "Dual",
          td: "{{dualTime}}",
          format: "^([0-9]{0,2}|[0-9]{2}:{1}[0-9]{0,2})$",
          editable: true
        },
        {
          th: "Instructor",
          td: "{{instructorTime}}",
          format: "^([0-9]{0,2}|[0-9]{2}:{1}[0-9]{0,2})$",
          editable: true
        },
        {
          th: "Night",
          td: "{{flightConditionNightTime}}",
          format: "^([0-9]{0,2}|[0-9]{2}:{1}[0-9]{0,2})$",
          editable: true
        },
        {
          th: "IFR",
          td: "{{flightConditionIfrTime}}",
          format: "^([0-9]{0,2}|[0-9]{2}:{1}[0-9]{0,2})$",
          editable: true
        },
        {
          th: "TOTAL",
          td: "{{totalTime}}",
          format: "^([0-9]{0,2}|[0-9]{2}:{1}[0-9]{0,2})$",
          editable: true
        }
      ]
    }
  ]
    }

    listSections: ItemListDTO = {
        rows: [
            {
                cols: [
                    {
                        isHeader: false,
                        icon: "calendar_today",
                        text: "{{flightDate}}",
                    },
                    {
                        isHeader: false,
                        icon: "flight_takeoff",
                        text: "{{departureAerodrome}}",
                    },
                    {
                        isHeader: false,
                        icon: "flight_landing",
                        text: "{{arrivalAerodrome}}",
                    }
                ]
            },
            {
                cols: [
                    {
                        isHeader: false,
                        icon: "airplanemode_active",
                        text: "{{aircraft.registration}}",
                    },
                    {
                        isHeader: false,
                        icon: "access_time",
                        text: "{{departureTime}} - {{arrivalTime}}",
                    },
                    {
                        isHeader: false,
                        icon: "timelapse",
                        text: "{{totalTime}}",
                    }
                ]
            }
        ]
    }

    constructor(apiService: ApiService) { 
        this.apiService = apiService;
        effect(()=>{
            this.selectedFlight()
            this.drawerOpened.set(false);
            if(this.selectedFlight() == null){
                this.getFlights();
            }
        })
    }
    ngOnInit(): void {
        // this.getFlights();
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