import { Component, computed, OnInit } from '@angular/core';
import { WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {FlightDTO} from "../../../DTOs/flightDTO";
import {MatCardModule} from "@angular/material/card";
import {Input} from "@angular/core";

@Component({
    selector: 'app-single-flight',
    templateUrl: './singleFlight.component.html',
    styleUrls: ['./singleFlight.component.scss'],
    imports: [MatCardModule, MatIconModule]
})
export class SingleFlightComponent {
    @Input() flight!: FlightDTO;
    @Input() selectedFlight!: WritableSignal<FlightDTO|null>;
    isActive = computed(()=> this.selectedFlight() == this.flight);
    constructor() {}
    clicked(){
        if(this.selectedFlight && this.selectedFlight() == this.flight){
            this.selectedFlight.set(null);
            return;
        }
        this.selectedFlight.set(this.flight);
    }

}