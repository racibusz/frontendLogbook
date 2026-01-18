import { Component, WritableSignal, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {ItemListDTO} from '../../../DTOs/itemListDTO';
import {getFieldValue} from '../itemsFunctions';

@Component({
    selector: 'app-single-item',
    templateUrl: './singleItem.component.html',
    styleUrls: ['./singleItem.component.scss'],
    standalone: true,
    imports: [CommonModule, MatIconModule, MatCardModule]
})
export class SingleItemComponent {
    @Input() item!: Object;
    @Input() sections!: ItemListDTO;
    @Input() selectedItem!: WritableSignal<Object|null>;
    getFieldValue = getFieldValue;
    isActive = computed(()=> this.selectedItem() == this.item);
    clicked(){
        if(this.isActive()){
            this.selectedItem.set(null);
            return;
        }
        this.selectedItem.set(this.item);
    }
}