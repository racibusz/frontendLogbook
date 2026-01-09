import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { Input } from '@angular/core';
import { WritableSignal } from '@angular/core';
import {RouterModule} from '@angular/router';
import { signal } from '@angular/core';


@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    imports: [RouterModule, CommonModule]
})
export class SidenavComponent {
    @Input() isMobile!: WritableSignal<boolean>;
    @Input() loggedIn!: Signal<boolean>;
}