import { FlightDTO } from '../../../DTOs/flightDTO';
import { Component, Input, OnInit, WritableSignal, signal, inject, effect, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { ContenteditableFieldDirective } from './contenteditable.directive';
import {ShimmeringDetailsComponent} from './shimmeringDetails/shimmeringDetails.component';
import {CreateFlightDTO} from '../../../DTOs/createFlightDTO';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Sections} from './sections';
import {ApiService} from '../../../services/api.service';
import { error } from 'console';

@Component({
    selector: 'app-flight-details',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule, MatTableModule, FormsModule, MatInputModule, MatButtonModule, MatButtonToggleModule, ContenteditableFieldDirective, ShimmeringDetailsComponent, MatDialogModule],
    templateUrl: './flightDetails.component.html',
    styleUrls: ['./flightDetails.component.scss']
})
export class FlightDetailsComponent{
    @Input() flight!: WritableSignal<FlightDTO | null>;
    changes = signal<FlightDTO | null>(null);
    shimmer = signal<boolean>(true);
    private _snackBar = inject(MatSnackBar);
    private _apiService = inject(ApiService);
    sections: Sections = new Sections();
    readonly dialog = inject(MatDialog);
    getFieldValue(fieldPath: string) {
        const flight = this.flight();
        if (!flight) return '';
        let val = fieldPath.split('.').reduce((obj: any, key) => obj?.[key], flight as any).toString();
        if(val==undefined)
            return "";
        if(val.endsWith(":00")){
           val = val.slice(0, -3); 
        }
        return val;
    }

    constructor() {
        effect(() => {
            this.flight();
            this.resetDOM()
            this.changes.set(null);
        });
    }

    deleteFlight(){
        const dialogRef = this.dialog.open(Dialog);
        let instance = dialogRef.componentInstance;
        instance.text = "Potwierdź usunięcie lotu";
        dialogRef.afterClosed().subscribe(result => {
            if(result == true){
                this._apiService.postData('flights/remove', {id: this.flight()?.id}).subscribe({
                    next: () => {
                        this.changes.set(null);
                        this.flight.set(null);
                    },
                    error: (err)=>{
                        console.log(err);
                    }
                })
            }
        });
    }

    saveChanges(){
        const flightId = this.changes()?.id;
        if(!flightId)
            return;
        const modifyFlightDTO:CreateFlightDTO = {
            departureAerodrome: this.changes()!.departureAerodrome,
            departureTime: this.changes()!.departureTime.toString(),
            arrivalAerodrome: this.changes()!.arrivalAerodrome,
            arrivalTime: this.changes()!.arrivalTime.toString(),
            flightDate: this.changes()!.flightDate,
            aircraftRegistration: this.changes()!.aircraft.registration,
            aircraftTypeId: this.changes()!.aircraft.aircraftType.id,
            SinglePilotSeTime: this.changes()!.SinglePilotSeTime,
            SinglePilotMeTime: this.changes()!.SinglePilotMeTime,
            multiPilotTime: this.changes()!.multiPilotTime,
            totalTime: this.changes()!.totalTime,
            picName: this.changes()!.picName,
            landingsDay: this.changes()!.landingsDay,
            landingsNight: this.changes()!.landingsNight,
            flightConditionNightTime: this.flight()!.flightConditionNightTime,
            flightConditionIfrTime: this.changes()!.flightConditionIfrTime,
            picTime: this.changes()!.picTime,
            copilotTime: this.changes()!.copilotTime,
            dualTime: this.changes()!.dualTime,
            instructorTime: this.changes()!.instructorTime,
            remarks: this.changes()!.remarks,
        }
        console.log(modifyFlightDTO);
        this._apiService.postData('flights/modify', {flightDTO: modifyFlightDTO, flightId: this.flight()!.id}).subscribe({
            next: (res)=>{
                this.flight.set(null);
            },
            error: (err)=>{
                console.log(err);
            }
        })
    }

    switchEditing(){
        if(this.changes() === null){
            let snackBar = this._snackBar.open('Edytuj tylko pola o ciemniejszym kolorze!', '', {duration: 3000});
            this.changes.set(JSON.parse(JSON.stringify(this.flight())));
        } else {
            const dialogRef = this.dialog.open(Dialog);
            let instance = dialogRef.componentInstance;
            instance.text = "Potwierdź wyjście z trybu edycji. \n Wyjście z trybu edycji doprowadzi do utracenia poczynionych zmian.";
            dialogRef.afterClosed().subscribe(result => {
                if(result == true){
                    this.changes.set(null);
                    this.resetDOM();
                }
            });
        }
    }
    resetDOM(){
        this.shimmer.set(true);
        setTimeout(()=>{this.shimmer.set(false)}, 350);
    }
}   

@Component({
  selector: 'dialog-confirm-editing-edit-mode',
  template: `
  <mat-dialog-content class="mat-typography">
  <p>{{text}}</p>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
  <button matButton mat-dialog-close>Anuluj</button>
  <button matButton [mat-dialog-close]="true" cdkFocusInitial>Potwierdź</button>
</mat-dialog-actions>`,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
    @Input() text!: string;
}