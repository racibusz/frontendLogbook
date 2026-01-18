import { Component, WritableSignal, Input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../services/api.service';
import { DetailsDTO } from '../../../DTOs/detailsDTO';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {ContenteditableFieldDirective} from './contenteditable.directive';
import { getFieldValue } from '../itemsFunctions';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Dialog } from "../../dialog/dialog.component";

@Component({
    selector: 'app-item-details',
    templateUrl: './itemDetails.component.html',
    styleUrls: ['./itemDetails.component.scss'],
    imports: [CommonModule, MatCardModule, MatButtonToggleModule, MatIconModule, ContenteditableFieldDirective, MatDialogModule, Dialog],
})
export class ItemDetailsComponent{
    @Input() item!: WritableSignal<Object | null>;
    @Input() sections!: DetailsDTO;
    changes = signal<Object | null>(null);
    readonly dialog = inject(MatDialog);

    @Input() delete!: (item: Object | null) => void;
    @Input() saveChanges!: (originalItem: Object|null, changes: Object|null) => void;
    
    shimmer = signal<boolean>(false);

    private _snackBar = inject(MatSnackBar);
    private _apiService = inject(ApiService);

    getFieldValue = getFieldValue;

    resetDOM(){
        this.shimmer.set(true);
        setTimeout(()=>{this.shimmer.set(false)}, 350);
    }


    switchEditing(){
        if(this.changes() === null){
            let snackBar = this._snackBar.open('Edytuj tylko pola o ciemniejszym kolorze!', '', {duration: 3000});
            this.changes.set(JSON.parse(JSON.stringify(this.item())));
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
}