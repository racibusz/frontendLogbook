import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landingPage.component.html',
    styleUrls: ['landingPage.component.scss'],
    imports: [CommonModule,MatProgressSpinnerModule]
})
export class LandingPageComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
    }
}