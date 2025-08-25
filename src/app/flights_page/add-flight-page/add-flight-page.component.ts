import { Component, WritableSignal, signal, computed, Signal } from "@angular/core";
import {Flight} from '../flights-list/flight.interface';
import { strict } from "assert";
import { effect } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { AircraftTypeInterface } from "../flights-list/aircraftType.interface";
import { createFlightDTO } from "./createFlightDTO";
import { Router } from "@angular/router";
import { AircraftDTO } from "./aircraftDTO";


@Component({
    selector: 'add-fligh-page',
    templateUrl: './add-flight-page.component.html',
    standalone: true
})
export class AddFlightPageComponent {
    constructor(private apiService: ApiService, private router:Router){}
    airplaneTypes = signal<AircraftTypeInterface[]>([]);
    selectedType = signal<AircraftTypeInterface | undefined>(undefined);
    error = signal<String | null>(null);
    validated = signal<boolean>(false);
    aircrafts = signal<AircraftDTO[]>([]);

    emptyFlight: createFlightDTO = {
            departureAerodrome: '',
        departureTime: '',
        arrivalAerodrome: '',
        arrivalTime: '',
        flightDate: '',
        aircraftRegistration: '',
        aircraftTypeId: 0,
        SinglePilotSeTime: '',
        SinglePilotMeTime: '',
        multiPilotTime: '',
        totalTime: '',
        picName: '',
        landingsDay: 0,
        landingsNight: 0,
        flightConditionNightTime: '',
        flightConditionIfrTime: '',
        picTime: '',
        copilotTime: '',
        dualTime: '',
        instructorTime: '',
        remarks: '',
    };
    flight: WritableSignal<createFlightDTO> = signal(this.emptyFlight);

    pilotFunctionCheckboxesStatus = signal({
        'picTime': true,
        'SinglePilotSeTime': true,
        'SinglePilotMeTime': false,
        'multiPilotTime': false,
        'instructorTime': false,
    })

    calculateTime(){
        if(this.flight().arrivalTime == '' || this.flight().departureTime == '')
            return
        const departureTime = this.flight().departureTime.split(':');
        const arrivalTime = this.flight().arrivalTime.split(':');

        const departure = new Date(`${this.flight().flightDate!=''?this.flight().flightDate:"2025-01-01"}T${departureTime[0]}:${departureTime[1]}:00`);
        const arrival = new Date(`${this.flight().flightDate!=''?this.flight().flightDate:"2025-01-01"}T${arrivalTime[0]}:${arrivalTime[1]}:00`)

        if(arrival.getHours()<departure.getHours())
            arrival.setDate(arrival.getDate()+1);

        const diffMs = arrival.getTime() - departure.getTime();
        const diffMinutes = Math.floor(diffMs / 60000);
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        // Sformatuj do HH:MM
        const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        this.setValue('totalTime', formatted);
        Object.entries(this.pilotFunctionCheckboxesStatus()).forEach(([key, value]) => {
            if(value){
                if(key == 'picTime')
                    this.setValue("picName", "SELF");
                this.setValue(key, this.flight()?.totalTime);
            }
            else{
                if(key=='picTime')
                    this.setValue("picName", "");
                this.setValue(key, '');
            }
        });
    }

    checkTypes(type:string){
        this.apiService.getData('airplanes/types/'+type).subscribe({
            next: (res)=>{this.airplaneTypes.set(res)},
            error: (err) => {throw err}
        })
    }

    setValue(field: string, val: any) {
        // Break of single responsibility rule, will have to figure out how to do it correctly
        this.flight.update(current=>{
            return({...current, [field]: val})
        })
        // If one of hours is affected, calculate them
        if(field == "departureTime" || field == "arrivalTime"){
            this.calculateTime();
        }
        console.log(this.flight());
    }
    getAirplanes(){
        this.apiService.getData('airplanes/'+this.flight()?.aircraftRegistration).subscribe({
            next: (res)=>{this.aircrafts.set(res); if(this.aircrafts().length==1){this.setValue('aircraftTypeId', this.aircrafts()[0].aircraftType.id)}else{this.setValue('aircraftTypeId', undefined)}},
            error: (err) => {throw err}
        })
        console.log(this.aircrafts().find((aircraft)=>{aircraft.registration == this.flight().aircraftRegistration}));
        console.log(this.aircrafts());
    }

    onAircraftInput(value: string){
        this.setValue("aircraftTypeId", this.airplaneTypes().find(type =>`${type.type} - ${type.model}`.toUpperCase() === value.toUpperCase())?.id);
        this.selectedType.set(this.airplaneTypes().find(type => type.id == this.flight()?.aircraftTypeId));
    }

    setPilotFunction(field: string, checked: boolean){
        this.pilotFunctionCheckboxesStatus.update(current=>{
            return({...current, [field]: checked});
        })
        this.calculateTime();
    }

    validate(){
        this.error.set('');
        if(!this.flight().aircraftTypeId){
            this.error.update((prev)=>{return prev+"\n"+"Please select the aircraft type"})
        }
        if(!this.flight().aircraftRegistration){
            this.error.update((prev)=>{return prev+"<br />"+"Please provide the aircraft registration"})
        }
        if(!this.flight().departureAerodrome){
            this.error.update((prev)=>{return prev+"<br />"+"Please provide the departure aerodrome"})
        }
        if(!this.flight().arrivalAerodrome){
            this.error.update((prev)=>{return prev+"<br />"+"Please provide the arrival aerodrome"})
        }
        if(!this.flight().flightDate){
            this.error.update((prev)=>{return prev+"<br />"+"Please provide the flight date"})
        }
        if(!this.flight().departureTime){
            this.error.update((prev)=>{return prev+"<br />"+"Please provide the departure time"})
        }
        if(!this.flight().arrivalTime){
            this.error.update((prev)=>{return prev+"<br />"+"Please provide the arrival time"})
        }
        if(!this.flight().totalTime){
            this.error.update((prev)=>{return prev+"<br />"+"Please provide the total flight time"})
        }
        if(!this.flight().picName){
            this.error.update((prev)=>{return prev+"<br />"+"Please provide the PIC name"})
        }
        if(this.error() != ''){
            this.error.update((prev)=>{return prev+"<br />"+"Please fix the errors above."})
        }
        if(this.error()==''){
            this.validated.set(true);
            this.error.set(null);            
        }
        // TODO: Implement a better validation mechanism
    }

    addFlight(){
        // TODO: data validation
        this.apiService.postData('flights', this.flight()).subscribe({
            next: (res)=>{this.router.navigate(["/flights"])},
            error: (err) => {throw err},
        });
    }
    clearFlight(){
        this.flight.set(this.emptyFlight);
    }
}