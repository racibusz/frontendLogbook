import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { Flight } from "../flight.interface";
import { Signal, signal, WritableSignal } from "@angular/core";
import { FlightPlannerComponent } from "../../../../components/flight-planner/flight-planner.component";
import { FlightInfoComponent } from "../../../../components/flight-info/flight-info.component";
import { Output, EventEmitter } from "@angular/core";

@Component({
    selector: "flight-details",
    templateUrl: "./flight-details.component.html",
    styleUrl: "./flight-details.component.scss",
    imports: [FlightPlannerComponent, FlightInfoComponent],
    standalone: true
})
export class FlightDetailsComponent {
    @Input() flight!: WritableSignal<Flight | undefined>;
    @Input() unsavedChanges!:WritableSignal<boolean>;
    @Output() flightModified = new EventEmitter<void>();
    selectedWindow = signal<number>(1);
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
    setWindow(to:number){
        if(this.selectedWindow() == to){
            this.selectedWindow.set(0);
            return;
        }
        this.selectedWindow.set(to);
    }
}