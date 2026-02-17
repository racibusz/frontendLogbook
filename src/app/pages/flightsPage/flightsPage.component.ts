import { Component, OnInit, inject, signal, WritableSignal, effect, Input, computed } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {FlightDTO} from "../../DTOs/flightDTO";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MobileDetector} from "../../services/mobileDetector";
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ItemListComponent} from "../../components/items/itemListComponent/itemList.component";
import { ItemListDTO } from '../../DTOs/itemListDTO';
import {ItemDetailsComponent} from '../../components/items/itemDetailsComponent/itemDetails.component';
import { DetailsDTO } from '../../DTOs/detailsDTO';
import {FlightsResponseDTO} from '../../DTOs/flightsResponseDTO';
import {ModifyFlightDTO} from '../../DTOs/modifyFlightDTO';
import { MapComponent } from '../../components/map/map.component';
import { InputType } from '../../DTOs/inputTypes';

@Component({
    selector: 'app-flights-page',
    templateUrl: './flightsPage.component.html',
    styleUrls: ['./flightsPage.component.scss'],
    imports: [ItemListComponent, ItemDetailsComponent, MatSidenavModule, MatIconModule, MatButtonModule, MapComponent],
})
export class FlightsPageComponent {
    apiService: ApiService;
    flights:WritableSignal<FlightDTO[]|null> = signal(null);
    selectedFlight:WritableSignal<FlightDTO|null> = signal(null);
    mobileDetector = inject(MobileDetector)
    isMobile = this.mobileDetector.isMobile;
    drawerOpened = signal(false);

    lineaerodrome1 = computed(()=>this.selectedFlight()?.departureAerodrome);
    lineaerodrome2 = computed(()=>this.selectedFlight()?.arrivalAerodrome);

    detailsSections: DetailsDTO = {
        sections: [
    {
      title: "Aircraft",
      iconName: "airplanemode_active",
      table: [
        { th: "Aircraft", iconName:"airplanemode_active", td: "{{aircraft.registration}}", editable: true, format: "UPPERCASE", linkTo: '/aircraft/{{aircraft.registration}}' },
        // { th: "Typ ICAO", td: "{{aircraft.aircraftType.type}}", editable: false, format: null},
        // { th: "Model", td: "{{aircraft.aircraftType.model}}", editable: false, format: null },
        // { th: "Kategoria", td: "{{aircraft.aircraftType.category}}", editable: false, format: null }
      ]
    },
    {
      title: "Date, time",
      iconName: "access_time",
      table: [
        {
          th: "Date",
          iconName: "calendar_today",
          inputType: InputType.date,
          td: "{{flightDate}}", 
          format: "^(\\d{0,4}|\\d{4}-\\d{0,2}|\\d{4}-\\d{2}-\\d{0,2})$",
          editable: true
        },
        {
          th: "Take-off",
          iconName: "flight_takeoff",
          inputType: InputType.time,
          td: "{{departureTime}}",
          format: "^([0-9]{0,2}|[0-9]{2}:{1}[0-9]{0,2})$",
          editable: true
        },
        {
          th: "Landing",
          iconName: "flight_landing",
          inputType: InputType.time,
          td: "{{arrivalTime}}",
          format: "^([0-9]{0,2}|[0-9]{2}:{1}[0-9]{0,2})$",
          editable: true
        },
        {
          th: "Czas lotu",
          iconName: "timelapse",
          inputType: InputType.time,
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
        { th: "Start", td: "{{departureAerodrome.icaoCode}}", editable: true, format: 'UPPERCASE' },
        { th: "Lądowanie", td: "{{arrivalAerodrome.icaoCode}}", editable: true, format: 'UPPERCASE' },
        // { th: "Model", td: "aircraft.aircraftType.model", editable: false, format: null },
        // { th: "Kategoria", td: "aircraft.aircraftType.category", editable: false, format: null }
      ]  
    },
    {
      title: "Landings",
      iconName: "flight_landing",
      table: [
        { th: "Day", td: "{{landingsDay}}", iconName:"wb_sunny", editable: true, format: null, inputType: InputType.number },
        { th: "Night", td: "{{landingsNight}}", iconName: "brightness_3", editable: true, format: null, inputType: InputType.number },
        // { th: "Model", td: "aircraft.aircraftType.model", editable: false, format: null },
        // { th: "Kategoria", td: "aircraft.aircraftType.category", editable: false, format: null }
      ]  
    },
    // {
    //   title: "People",
    //   iconName: "people",

    //   table: [
    //     // { th: "Model", td: "aircraft.aircraftType.model", editable: false, format: null },
    //     // { th: "Kategoria", td: "aircraft.aircraftType.category", editable: false, format: null }
    //   ]  
    // },
    {
      title: "Additional Info",
      iconName: "notes",
      table: [
        { th: "PIC", td: "{{picName}}", iconName: "perm_identity",editable: true, format: null },
        { th: "REMARKS", td: "{{remarks}}", editable: true, format: null, inputType: InputType.textarea, },
        // { th: "Model", td: "aircraft.aircraftType.model", editable: false, format: null },
        // { th: "Kategoria", td: "aircraft.aircraftType.category", editable: false, format: null }
      ]  
    },
    {
      title: "Statistics",
      iconName: "timeline",
      table: [
        {
          th: "PIC",
          td: "{{picTime}}", 
          inputType: InputType.time,
          format: "^([0-9]{0,2}|[0-9]{2}:{1}[0-9]{0,2})$",
          editable: true
        },
        {
          th: "Co-pilot",
          td: "{{copilotTime}}",
          inputType: InputType.time,
          format: "^([0-9]{0,2}|[0-9]{2}:{1}[0-9]{0,2})$",
          editable: true
        },
        {
          th: "Dual",
          td: "{{dualTime}}",
          inputType: InputType.time,
          format: "^([0-9]{0,2}|[0-9]{2}:{1}[0-9]{0,2})$",
          editable: true
        },
        {
          th: "Instructor",
          td: "{{instructorTime}}",
          inputType: InputType.time,
          format: "^([0-9]{0,2}|[0-9]{2}:{1}[0-9]{0,2})$",
          editable: true
        },
        {
          th: "Night",
          td: "{{flightConditionNightTime}}",
          inputType: InputType.time,
          format: "^([0-9]{0,2}|[0-9]{2}:{1}[0-9]{0,2})$",
          editable: true
        },
        {
          th: "IFR",
          td: "{{flightConditionIfrTime}}",
          inputType: InputType.time,
          format: "^([0-9]{0,2}|[0-9]{2}:{1}[0-9]{0,2})$",
          editable: true
        },
        {
          th: "TOTAL",
          td: "{{totalTime}}",
          inputType: InputType.time,
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
                        text: "{{departureAerodrome.icaoCode}}",
                    },
                    {
                        isHeader: false,
                        icon: "flight_landing",
                        text: "{{arrivalAerodrome.icaoCode}}",
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

    saveFlight = (originalItem: Object|null, changes: Object | null) => {
      const data: ModifyFlightDTO = {
        flight: {...changes as FlightDTO, aircraftRegistration: (changes as any)?.aircraft?.registration, aircraftTypeId: 0, flightDate: (changes as any)?.flightDate.toString(), departureTime: (changes as any)?.departureTime.toString(), arrivalTime: (changes as any)?.arrivalTime.toString(), totalTime: (changes as any)?.totalTime, departureAerodrome: (changes as any)?.departureAerodrome.icaoCode, arrivalAerodrome: (changes as any)?.arrivalAerodrome.icaoCode},
        flightId: (originalItem as FlightDTO).id
      }
      this.apiService.postData<FlightDTO>('flights/modify', data).subscribe({
        next: (data) => {
          this.getFlights();
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
    deleteFlight = (flight: Object|null) => {
      this.apiService.postData<FlightDTO>('flights/remove', {id: (flight as FlightDTO).id}).subscribe({
        next: (data) => {
          this.getFlights();
          },
        error: (error) => {
          console.error(error);
        }
      });
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
      this.apiService.getData<FlightsResponseDTO>('flights').subscribe({
          next: (data) => {
            this.flights.set(data.flights);
            const selectedFlight = this.selectedFlight()?.id;
            this.selectedFlight.set(this.flights()?.find(flight => flight.id === selectedFlight) || null);
          },
          error: (error) => {
            console.error(error);
          }
      });
      // this.apiService.getData<Airports>('airports').subscribe({
      //   next: (data)=>{
      //     console.log(data);
      //   },
      //   error: (err) => {
      //     console.log(err);
      //   }
      // })
    }
}