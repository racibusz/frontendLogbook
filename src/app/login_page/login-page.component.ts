import { Component } from "@angular/core";
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common'
import { Router } from "@angular/router";
import { ApiService } from "../services/api.service";
import { inject } from "@angular/core";
import { TokenService } from "../token/token.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginPageComponent {
  constructor (private apiService: ApiService, private tokenSerice:TokenService, private router:Router){}
  // TODO: Implement httpclient login
  email:string = '';
  password:string = '';
  login(e:Event){
    e.preventDefault();
    this.apiService.postData("auth/login", {email:this.email, password:this.password}).subscribe({
      next: (res)=>{this.tokenSerice.setToken(res.accessToken);this.router.navigate(["/"]);},
      error: (err)=>{throw err}
    })
  }
}