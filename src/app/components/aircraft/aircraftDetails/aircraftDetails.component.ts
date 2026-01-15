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
import { ContenteditableFieldDirective } from '../../flights/flightDetails/contenteditable.directive';
import {ShimmeringDetailsComponent} from './shimmeringDetails/shimmeringDetails.component';
import {CreateFlightDTO} from '../../../DTOs/createFlightDTO';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Sections} from './sections';
import {ApiService} from '../../../services/api.service';
import { error } from 'console';
import { AirplaneDTO } from '../../../DTOs/airplaneDTO';

@Component({
    selector: 'app-aircraft-details',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule, MatTableModule, FormsModule, MatInputModule, MatButtonModule, MatButtonToggleModule, ContenteditableFieldDirective, ShimmeringDetailsComponent, MatDialogModule],
    templateUrl: './aircraftDetails.component.html',
    styleUrls: ['./aircraftDetails.component.scss']
})
export class AircraftDetailsComponent{
    @Input() aircraft!: WritableSignal<AirplaneDTO | null>;
    changes = signal<AirplaneDTO | null>(null);
    shimmer = signal<boolean>(true);
    private _snackBar = inject(MatSnackBar);
    private _apiService = inject(ApiService);
    sections: Sections = new Sections();
    readonly dialog = inject(MatDialog);
    getFieldValue(fieldPath: string) {
        const aircraft = this.aircraft();
        if (!aircraft) return '';
        let val = fieldPath.split('.').reduce((obj: any, key) => obj?.[key], aircraft as any).toString();
        if(val==undefined)
            return "";
        if(val.endsWith(":00")){
           val = val.slice(0, -3); 
        }
        return val;
    }

    constructor() {
        effect(() => {
            this.aircraft();
            this.resetDOM()
            this.changes.set(null);
        });
    }

    switchEditing(){
        if(this.changes() === null){
            let snackBar = this._snackBar.open('Edytuj tylko pola o ciemniejszym kolorze!', '', {duration: 3000});
            this.changes.set(JSON.parse(JSON.stringify(this.aircraft())));
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

    saveChanges(){
        
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