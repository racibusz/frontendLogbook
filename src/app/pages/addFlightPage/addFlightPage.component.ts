import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {AirportDTO} from '../../DTOs/airportDTO';

import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-add-flight-page',
  standalone: true,
  templateUrl: './addFlightPage.component.html',
  styleUrls: ['./addFlightPage.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule
  ]
})
export class AddFlightPageComponent implements OnInit {

  flightForm!: FormGroup;

  departureAerodrome = signal<AirportDTO|null>(null);
  arrivalAerodrome = signal<AirportDTO|null>(null);

  constructor(private fb: FormBuilder, private apiService:ApiService) {}

  ngOnInit(): void {
    this.flightForm = this.fb.group({
      departureAerodrome: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalAerodrome: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      flightDate: ['', Validators.required],

      aircraftRegistration: ['', Validators.required],
      aircraftTypeId: [null],

      SinglePilotSeTime: [''],
      SinglePilotMeTime: [''],
      multiPilotTime: [''],
      totalTime: [''],

      picName: [''],
      landingsDay: [0],
      landingsNight: [0],

      flightConditionNightTime: [''],
      flightConditionIfrTime: [''],

      picTime: [''],
      copilotTime: [''],
      dualTime: [''],
      instructorTime: [''],

      remarks: [''],

      SinglePilotSeTimeCheckbox: [true],
      SinglePilotMeTimeCheckbox: [false],
      multiPilotTimeCheckbox: [false],
      picTimeCheckbox: [true],
    });

    this.setupTotalTimeCalculation();

    this.setupAirportNames();

    this.bindCheckboxToTotalTime('SinglePilotSeTimeCheckbox', 'SinglePilotSeTime');
    this.bindCheckboxToTotalTime('SinglePilotMeTimeCheckbox', 'SinglePilotMeTime');
    this.bindCheckboxToTotalTime('multiPilotTimeCheckbox', 'multiPilotTime');
    this.bindCheckboxToTotalTime('picTimeCheckbox', 'picTime');
  }

  private bindCheckboxToTotalTime(
    checkboxName: string,
    targetControlName: string
  ): void {
    const checkbox = this.flightForm.get(checkboxName)!;
    const target = this.flightForm.get(targetControlName)!;
    const totalTime = this.flightForm.get('totalTime')!;

    if (checkbox.value) {
      target.enable({ emitEvent: false });
      target.setValue(totalTime.value, { emitEvent: false });
    } else {
      target.disable({ emitEvent: false });
      target.setValue('', { emitEvent: false });
    }

    checkbox.valueChanges.subscribe((checked: boolean) => {
      if (checked) {
        target.enable({ emitEvent: false });
        target.setValue(totalTime.value, { emitEvent: false });
      } else {
        target.disable({ emitEvent: false });
        target.setValue('', { emitEvent: false });
      }
    });

    totalTime.valueChanges.subscribe(value => {
      if (checkbox.value) {
        target.setValue(value, { emitEvent: false });
      }
    });
  }

  private setupTotalTimeCalculation(): void {
    this.flightForm.get('departureTime')!.valueChanges
      .subscribe(() => this.calculateTotalTime());

    this.flightForm.get('arrivalTime')!.valueChanges
      .subscribe(() => this.calculateTotalTime());
  }

  private calculateTotalTime(): void {
    const departure = this.flightForm.get('departureTime')!.value;
    const arrival = this.flightForm.get('arrivalTime')!.value;

    if (!departure || !arrival) {
      this.flightForm.get('totalTime')!.setValue('');
      return;
    }

    const [depH, depM] = departure.split(':').map(Number);
    const [arrH, arrM] = arrival.split(':').map(Number);

    let departureMinutes = depH * 60 + depM;
    let arrivalMinutes = arrH * 60 + arrM;

    if (arrivalMinutes < departureMinutes) {
      arrivalMinutes += 24 * 60;
    }

    const diff = arrivalMinutes - departureMinutes;

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    const totalTime = `${this.pad(hours)}:${this.pad(minutes)}`;

    this.flightForm.get('totalTime')!.setValue(totalTime);
  }

  private pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

  private setupAirportNames(){
    this.flightForm.get('departureAerodrome')!.valueChanges
      .subscribe(()=>this.getAirportNames());
    this.flightForm.get('arrivalAerodrome')!.valueChanges
      .subscribe(()=>this.getAirportNames());
  }
  private getAirportNames(){
    const arrivalAerodrome = this.flightForm.get("arrivalAerodrome")!.value;
    const departureAerodrome = this.flightForm.get("departureAerodrome")!.value;
    if(arrivalAerodrome.length==0){
      this.arrivalAerodrome.set(null);
    }
    if(departureAerodrome.length==0){
      this.departureAerodrome.set(null);
    }
    if(arrivalAerodrome.length>=4 && arrivalAerodrome!=this.arrivalAerodrome()?.icaoCode){
      this.apiService.getData<AirportDTO>("airports/"+arrivalAerodrome).subscribe({
        next: (data)=>{
          this.arrivalAerodrome.set(data)
        },
        error: (err)=>{
          console.log(err);
        }
      })
    }
    if(departureAerodrome.length>=4 && departureAerodrome!=this.departureAerodrome()?.icaoCode){
      this.apiService.getData<AirportDTO>("airports/"+departureAerodrome).subscribe({
        next: (data)=>{
          this.departureAerodrome.set(data)
        },
        error: (err)=>{
          console.log(err);
        }
      })
    }
  }

  submit(): void {
    if (this.flightForm.invalid) {
      this.flightForm.markAllAsTouched();
      return;
    }

    console.log('CreateFlightDTO:', this.flightForm.getRawValue());
  }
}
