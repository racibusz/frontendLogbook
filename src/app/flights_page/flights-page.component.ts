import { Component } from "@angular/core";
import { SideNavComponent } from "../../components/side-nav/sidenav.component";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'flights-page',
    templateUrl: './flights-page.component.html',
    imports: [RouterOutlet, SideNavComponent]
})
export class FlightsPageComponent {
    // Component logic goes here
}