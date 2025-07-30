import { Component } from "@angular/core";
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common'
import { Router } from "@angular/router";
import { ApiService } from "../services/api.service";
import { inject } from "@angular/core";
import { TokenService } from "../token/token.service";

@Component({
  selector: 'app-logout-page',
  standalone: true,
  template: ``,
})
export class LoginPageComponent {
  constructor (private tokenSerice:TokenService, private router: Router){}
  ngOnInit(){
    this.tokenSerice.removeToken();
    this.router.navigate(["/"]);
  }
}