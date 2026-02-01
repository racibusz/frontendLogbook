import { Component, WritableSignal, Input, signal, inject, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../services/api.service';
import { DetailsDTO } from '../../../DTOs/detailsDTO';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {ContenteditableFieldDirective} from './contenteditable.directive';
import { getFieldValue, resolvePath } from '../itemsFunctions';
import {MobileDetector} from '../../../services/mobileDetector';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule} from '@angular/router';
import { Dialog } from "../../dialog/dialog.component";
import {MatFormField} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-item-details',
    templateUrl: './itemDetails.component.html',
    styleUrls: ['./itemDetails.component.scss'],
    imports: [CommonModule, MatCardModule, MatButtonToggleModule, MatIconModule, ContenteditableFieldDirective, MatDialogModule, Dialog, RouterModule, MatFormField, MatInputModule, FormsModule],
})
export class ItemDetailsComponent{
    @Input() item!: WritableSignal<Record<string, any> | null>;
    @Input() sections!: DetailsDTO;
    changes = signal<Record<string, any> | null>(null);
    readonly dialog = inject(MatDialog);

    mobileDetector = inject(MobileDetector)
    isMobile = this.mobileDetector.isMobile;
    
    canEdit = computed(()=>{
        if(this.item() == null) return false;
        return resolvePath('{{canEdit}}', this.item()) == "true";
    });

    @Input() delete!: (item: Object | null) => void;
    @Input() saveChanges!: (originalItem: Object|null, changes: Object|null) => void;
    
    shimmer = signal<boolean>(false);

    private _snackBar = inject(MatSnackBar);
    private _apiService = inject(ApiService);

    // getFieldValue = getFieldValue;
    resolvePath = resolvePath;

    getFieldValue(key: string) {
    return this.changes()
        ? resolvePath(key, this.changes())
        : resolvePath(key, this.item());
    }

    getFieldValueComputed(key: string) {
    return computed(() => {
        const source = this.changes() ?? this.item();
        return resolvePath(key, source);
    });
    }


setValue(key: string, rawValue: string, format: string | null) {
  const cleanKey = key.replace(/[{}]/g, '').trim();
  const path = cleanKey.split('.');

  const previous = this.getFieldValueComputed(key)();
  let value = rawValue;

  if (format) {

    if (format === 'UPPERCASE') {
      value = value.toUpperCase();
    }

    else {
      const regex = new RegExp(format, 'g');
      const matches = value.match(regex);

      console.log(matches);

      if (!matches) {
        console.log("previous " , previous)
        console.log("Value: " ,value)
        // value = "" + previous + " ";
        value = " "+previous;
      }else{
          value = matches.join('');
      }

    //   const typing = previous.length < value.length;
      const typing = rawValue.length > previous.length;

      if (typing && (value.length === 4 || value.length === 7) && cleanKey.endsWith('Date')) {
        value += '-';
      }

      if (typing && value.length === 2 && cleanKey.endsWith('Time')) {
        value += ':';
      }

      if (cleanKey.endsWith('Time') && value.length > 5) {
        return;
      }
    }
  }

    this.changes.update(ch => {
    const updated = structuredClone(ch!);
    let ref: any = updated;

    for (let i = 0; i < path.length - 1; i++) {
      ref = ref[path[i]];
    }

    ref[path[path.length - 1]] = value;
    return updated;
  });
}
    resetDOM(){
        this.changes.set(null);
        this.shimmer.set(true);
        setTimeout(()=>{this.shimmer.set(false)}, 350);
    
    }


    askForDeleting(item: Object | null){
        const dialogRef = this.dialog.open(Dialog);
        let instance = dialogRef.componentInstance;
        instance.text = "Czy na pewno chcesz usunąć ten element?";
        dialogRef.afterClosed().subscribe(result => {
            if(result == true){
                this.delete(item);
            }
        });
    }

    switchEditing(){
        if(this.changes() === null){
            let snackBar = this._snackBar.open('Edytuj tylko pola o ciemniejszym kolorze!', '', {duration: 3000});
            // this.changes.set(JSON.parse(JSON.stringify(this.item())));
            this.changes.set(structuredClone(this.item()!));
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