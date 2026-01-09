import { FlightDTO } from '../../../DTOs/flightDTO';
import { Component, Input, OnInit, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-flight-details',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule, MatTableModule],
    templateUrl: './flightDetails.component.html',
    styleUrls: ['./flightDetails.component.scss']
})
export class FlightDetailsComponent{
    @Input() flight!: WritableSignal<FlightDTO | null>;
}