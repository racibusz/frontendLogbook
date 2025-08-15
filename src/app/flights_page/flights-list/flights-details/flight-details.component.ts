import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { Flight } from "../flight.interface";
import { Signal, signal, WritableSignal } from "@angular/core";

@Component({
    selector: "flight-details",
    templateUrl: "./flight-details.component.html",
    styleUrl: "./flight-details.component.scss",
    standalone: true
})
export class FlightDetailsComponent {
    @Input() flight!: WritableSignal<Flight | undefined>;
    @Input() unsavedChanges!:WritableSignal<boolean>;
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
}