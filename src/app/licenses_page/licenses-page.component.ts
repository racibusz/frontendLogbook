import { Component, signal } from "@angular/core";
import { SideNavComponent } from "../../components/side-nav/sidenav.component";
import { RouterOutlet } from "@angular/router";
import {ApiService} from '../services/api.service';
import { error } from "console";
import { LicenseDTO } from "./licenseDTO";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'licenses-page',
    templateUrl: './licenses-page.component.html',
    imports: [RouterOutlet, CommonModule]
})
export class LicensesPageComponent {
    constructor(private apiService:ApiService){}
    license = signal<undefined|LicenseDTO>(undefined);
    getData(){
        this.apiService.getData('license').subscribe({
            next: (data)=>{this.license.set(data[0]); console.log(this.license())},
            error: (err)=>{throw err},
        })
    }
    ngOnInit(){
        this.getData();
    }
}