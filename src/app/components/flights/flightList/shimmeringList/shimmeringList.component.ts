import { Component } from '@angular/core';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-shimmering-list',
    templateUrl: './shimmeringList.component.html',
    styleUrls: ['./shimmeringList.component.scss'],
    imports: [CommonModule, MatCardModule, MatButtonToggle, MatIcon]
})
export class ShimmeringListComponent {
    constructor() {}
}