import { Component, inject } from "@angular/core";
import { Router, RouterLink, RouterModule } from "@angular/router";

@Component({
    selector: 'side-nav',
    imports: [RouterLink, RouterModule],
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SideNavComponent {
    // Component logic goes here
}