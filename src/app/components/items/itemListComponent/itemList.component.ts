import { Component, Input, WritableSignal, effect } from '@angular/core';
import {CommonModule } from '@angular/common';
import { ItemListDTO } from '../../../DTOs/itemListDTO';
import {SingleItemComponent} from '../singleItemComponent/singleItem.component';

@Component({
    selector: 'app-item-list',
    templateUrl: './itemList.component.html',
    styleUrls: ['./itemList.component.scss'],
    imports: [CommonModule, SingleItemComponent]
})
export class ItemListComponent {
    @Input() items!: WritableSignal<Object[] | null>;
    @Input() selectedItem!: WritableSignal<Object|null>;
    @Input() sections!: ItemListDTO;
}