import { Component, WritableSignal, signal, computed, Signal } from "@angular/core";
import {Flight} from '../flights-list/flight.interface';
import { strict } from "assert";
import { effect } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { AircraftTypeInterface } from "../flights-list/aircraftType.interface";
import { createFlightDTO } from "./createFlightDTO";

@Component({
    selector: 'add-fligh-page',
    templateUrl: './add-flight-page.component.html',
    standalone: true
})
export class AddFlightPageComponent {
    constructor(private apiService: ApiService){}
    airplaneTypes = signal<AircraftTypeInterface[]>([]);
    flight: WritableSignal<createFlightDTO> = signal({
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
    });

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
    }
    onAircraftInput(value: string){
        this.setValue("aircraftTypeId", this.airplaneTypes().find(type =>`${type.type} - ${type.model}`.toUpperCase() === value.toUpperCase())?.id);
    }
}