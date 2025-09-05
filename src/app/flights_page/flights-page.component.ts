import { Component } from "@angular/core";
import { SideNavComponent } from "../../components/side-nav/sidenav.component";
import { RouterOutlet } from "@angular/router";
import {ApiService} from '../services/api.service';

@Component({
    selector: 'flights-page',
    templateUrl: './flights-page.component.html',
    imports: [RouterOutlet, SideNavComponent]
})
export class FlightsPageComponent {

}