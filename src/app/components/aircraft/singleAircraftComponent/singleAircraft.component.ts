import { Component, computed, OnInit } from '@angular/core';
import { WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {FlightDTO} from "../../../DTOs/flightDTO";
import {MatCardModule} from "@angular/material/card";
import {Input} from "@angular/core";
import { AirplaneDTO } from '../../../DTOs/airplaneDTO';

@Component({
    selector: 'app-single-aircraft',
    templateUrl: './singleAircraft.component.html',
    styleUrls: ['./singleAircraft.component.scss'],
    imports: [MatCardModule, MatIconModule]
})
export class SingleAircraftComponent {
    @Input() aircraft!: AirplaneDTO;
    @Input() selectedAircraft!: WritableSignal<AirplaneDTO|null>;
    isActive = computed(()=> this.selectedAircraft() == this.aircraft);
    constructor() {}
    clicked(){
        if(this.selectedAircraft && this.selectedAircraft() == this.aircraft){
            this.selectedAircraft.set(null);
            return;
        }
        this.selectedAircraft.set(this.aircraft);
    }
    ngOnInit(){
        console.log(this.aircraft);
    }

}