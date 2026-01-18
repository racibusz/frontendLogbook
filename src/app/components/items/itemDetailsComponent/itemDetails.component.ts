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


@Component({
    selector: 'app-item-details',
    templateUrl: './itemDetails.component.html',
    styleUrls: ['./itemDetails.component.scss'],
    imports: [CommonModule, MatCardModule, MatButtonToggleModule, MatIconModule, ContenteditableFieldDirective],
})
export class ItemDetailsComponent{
    @Input() item!: WritableSignal<Object | null>;
    @Input() sections!: DetailsDTO;
    changes = signal<Object | null>(null);
    
    shimmer = signal<boolean>(true);

    private _snackBar = inject(MatSnackBar);
    private _apiService = inject(ApiService);

    getFieldValue = getFieldValue;


    ngOnInit(){
        console.log(this.sections);
        console.log(this.item());
    }

    resetDOM(){
        this.shimmer.set(true);
        setTimeout(()=>{this.shimmer.set(false)}, 350);
    }

    switchEditing(){

    }
    saveChanges(){

    }
    delete(){

    }
}