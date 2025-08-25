import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { Signal, signal, WritableSignal } from "@angular/core";
import { Flight } from "../../app/flights_page/flights-list/flight.interface";
import { ApiService } from "../../app/services/api.service";
import { EventEmitter, Output } from "@angular/core";
import { createFlightDTO } from "../../app/flights_page/add-flight-page/createFlightDTO";

@Component({
    selector: "flight-info",
    templateUrl: "./flight-info.component.html",
    standalone: true
})
export class FlightInfoComponent {
    @Input() flight!: WritableSignal<Flight | undefined>;
    @Input() unsavedChanges!:WritableSignal<boolean>;
    constructor(private apiService: ApiService){};
    @Output() flightModified = new EventEmitter<void>();
    updateSelected(field: string, value: any){
        this.flight.update(current=>{
            if(current==undefined) return;
            return({...current, [field]:value})
        })
        this.unsavedChanges.set(true);
    }
    deselect(){
        this.flight.set(undefined)
    }
    saveChanges(){
        // Not the most elegant way to do this, but it works for now
        const flightDTO:createFlightDTO = {
            departureAerodrome: this.flight()?.departureAerodrome ?? "",
            departureTime: this.flight()?.departureTime ?? "",
            arrivalAerodrome: this.flight()?.arrivalAerodrome ?? "",
            arrivalTime: this.flight()?.arrivalTime ?? "",
            flightDate: this.flight()?.flightDate ?? "",
            aircraftRegistration: this.flight()?.aircraft.registration ?? "",
            aircraftTypeId: this.flight()?.aircraft.aircraftType.id ?? 0,
            SinglePilotSeTime: this.flight()?.SinglePilotSeTime ?? "00:00",
            SinglePilotMeTime: this.flight()?.SinglePilotMeTime ?? "00:00",
            multiPilotTime: this.flight()?.multiPilotTime ?? "00:00",
            totalTime: this.flight()?.totalTime ?? "00:00",
            picName: this.flight()?.picName ?? "",
            landingsDay: this.flight()?.landingsDay ?? 0,
            landingsNight: this.flight()?.landingsNight ?? 0,
            flightConditionNightTime: this.flight()?.flightConditionNightTime ?? "00:00",
            flightConditionIfrTime: this.flight()?.flightConditionIfrTime ?? "00:00",
            picTime: this.flight()?.picTime ?? "00:00",
            copilotTime: this.flight()?.copilotTime ?? "00:00",
            dualTime: this.flight()?.dualTime ?? "00:00",
            instructorTime: this.flight()?.instructorTime ?? "00:00",
            remarks:this.flight()?.remarks ?? ""
        }
        this.apiService.postData("flights/modify", { flightDTO: flightDTO, flightId: this.flight()?.id }).subscribe({
            next: (res) => {
                this.unsavedChanges.set(false);
                this.flightModified.emit();
            }
            , error: (err) => {throw err}
        });
    }
    removeFlight(){
        this.apiService.postData("flights/remove", {id: this.flight()?.id}).subscribe({
            next: (res) => {
                this.flight.set(undefined);
                this.flightModified.emit();
            }
            , error: (err) => {throw err}
        });
        this.unsavedChanges.set(false);
    }
}