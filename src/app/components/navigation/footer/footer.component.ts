import { Component } from '@angular/core';
import {LogoComponent} from '../../logo/logo.component';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    imports: [LogoComponent]
})
export class FooterComponent {
}