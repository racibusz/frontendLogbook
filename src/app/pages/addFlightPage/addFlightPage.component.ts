import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {AirportDTO} from '../../DTOs/airportDTO';

import {ApiService} from '../../services/api.service';

import {MapComponent} from '../../components/map/map.component';
import { AirplaneDTO } from '../../DTOs/airplaneDTO';
import { AirplaneTypeDTO } from '../../DTOs/airplaneTypeDTO';

import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { Dialog } from '../../components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD.MM.YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-add-flight-page',
  standalone: true,
  templateUrl: './addFlightPage.component.html',
  styleUrls: ['./addFlightPage.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MapComponent,
    MatAutocompleteModule,
    Dialog
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ]

})
export class AddFlightPageComponent implements OnInit {
  flightForm!: FormGroup;

  readonly dialog = inject(MatDialog);
  router = inject(Router);


  departureAerodrome = signal<AirportDTO|undefined>(undefined);
  arrivalAerodrome = signal<AirportDTO|undefined>(undefined);

  aircraftAutoComplete = signal<AirplaneDTO[] | undefined>(undefined);
  typeAutoComplete = signal<AirplaneTypeDTO[] | undefined>(undefined);
  typeInputted = signal<String | undefined>(undefined);

  constructor(private fb: FormBuilder, private apiService:ApiService) {}

  ngOnInit(): void {
    this.flightForm = this.fb.group({
      departureAerodrome: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalAerodrome: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      flightDate: [new Date(), Validators.required],

      aircraftRegistration: ['', Validators.required],
      aircraftTypeId: [null],
      aircraftTypeType: [''],

      SinglePilotSeTime: [''],
      SinglePilotMeTime: [''],
      multiPilotTime: [''],
      totalTime: [''],

      picName: ['SELF'],
      landingsDay: [1],
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
      copilotTimeCheckbox: [false],
      dualTimeCheckbox: [false],
      instructorTimeCheckbox: [false],
    });

    this.setupTotalTimeCalculation();

    this.setupAirportNames();
    this.setupAircraftAutocomplete();
    this.setupTypeAutocomplete();

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
      this.arrivalAerodrome.set(undefined);
    }
    if(departureAerodrome.length==0){
      this.departureAerodrome.set(undefined);
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

  private setupAircraftAutocomplete(){
    this.flightForm.get('aircraftRegistration')!.valueChanges
      .subscribe(()=>{this.getAircraftAutocomplete()})
  }

  private getAircraftAutocomplete(){
    const enteredRegistration = this.flightForm.get('aircraftRegistration')?.value
    if(enteredRegistration == ""){
      this.aircraftAutoComplete.set(undefined);
      return;
    }
    this.apiService.getData<AirplaneDTO[]>("airplanes/"+enteredRegistration).subscribe({
      next: (data)=>{
        this.aircraftAutoComplete.set(data);
      },
      error(err) {
        console.log(err);
      },
    })
  }

  private setupTypeAutocomplete(){
    this.flightForm.get('aircraftTypeType')!.valueChanges
      .subscribe(()=>{this.getAircraftTypeAutocomplete()})
  }

  private getAircraftTypeAutocomplete(){
    const aircraftTypeInputted = this.flightForm.get('aircraftTypeType')?.value;
    if(aircraftTypeInputted == '')
      return;
      const match = aircraftTypeInputted.match(/\(#(\d+)\)/);

    if (match) {
      this.flightForm.patchValue({
        'aircraftTypeId': match[1],
      });
      return;
    }
    this.apiService.getData<AirplaneTypeDTO[]>('airplanes/types/'+aircraftTypeInputted).subscribe({
      next: (data)=>{
        this.typeAutoComplete.set(data);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  submit(): void {
    if (this.flightForm.invalid) {
          Object.keys(this.flightForm.controls).forEach(key => {
      const control = this.flightForm.get(key);
      if (control?.invalid) {
        console.log(`Control "${key}" invalid:`, control.errors);
      }
    });
      this.flightForm.markAllAsTouched();
      return;
    }
    this.apiService.postData('flights', this.flightForm.getRawValue()).subscribe({
      next: (data)=>{
        const dialogRef = this.dialog.open(Dialog);
        let instance = dialogRef.componentInstance;
        instance.text = "Czy chcesz dodać kolejny lot?";
        dialogRef.afterClosed().subscribe(result => {
            if(result == true){
              this.flightForm.reset();
            }
            else{
              this.router.navigate(['/flights']);
            }
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
