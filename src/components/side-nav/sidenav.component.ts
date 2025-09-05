import { Component, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink, RouterModule } from "@angular/router";

@Component({
    selector: 'side-nav',
    imports: [RouterLink, RouterModule, CommonModule],
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SideNavComponent {
    userWindow = signal<boolean>(false);
    openUserWindow(){
        this.userWindow.update((prev)=>{return !prev});
    }
    userBtnClicked(){
        this.userWindow.set(false);
    }
}