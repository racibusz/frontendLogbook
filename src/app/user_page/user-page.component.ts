import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { signal } from "@angular/core";
import { ApiService } from "../services/api.service";
import { userDTO } from "./userDTO";
import { UserInfoComponent } from "../../components/user-info/user-info.component";
import {UserAddressComponent} from "../../components/user-address/user-address.component";

@Component({
    selector: 'user-page',
    templateUrl: './user-page.component.html',
    imports: [RouterOutlet, UserInfoComponent, UserAddressComponent]
})
export class UserPageComponent {
    constructor(private apiService: ApiService){}
    user = signal<userDTO>({});
    changes = signal<boolean>(false);
    getData(){
        this.apiService.getData('user').subscribe({
            next: (data)=>{this.user.set(data)},
            error: (err)=>{throw err}
        })
    }
    userChanged(){
        this.changes.set(true);
    }
    saveChanges(){
        this.changes.set(false);
        this.apiService.postData('user', this.user()).subscribe({
            next: (data)=>{this.user.set(data)},
            error: (err)=>{throw err}
        })
    }
    ngOnInit(){
        this.getData();
    }
}