
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { ApiService } from '../../services/api.service';
import {MatButtonModule} from '@angular/material/button';
import {TokenService} from '../../services/token.service';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@Component({
    selector: 'app-login-page',
    imports: [ReactiveFormsModule, CommonModule, MatProgressSpinnerModule, MatButtonModule, MatInputModule, MatCardModule],
    templateUrl: './loginPage.component.html',
    styleUrls: ['./loginPage.component.scss']
})
export class LoginPageComponent {
    form: FormGroup;
    processing = signal(false);
    loginError = signal<string | null>(null);
    router = inject(Router);

    constructor(private fb: FormBuilder, private apiService: ApiService, private tokenService: TokenService) {
        this.form = this.fb.group({
        email: [
            '',
            [
            Validators.required,
            Validators.email
            ]
        ],
        password: [
            '',
            [
            Validators.required,
            Validators.minLength(6)
            ]
        ]
        });
    }
    clearLoginError(){
        this.loginError.set(null);
    }
    onSubmit() {
        if(this.form.valid) {
            this.processing.set(true);
            this.apiService.postData<{accessToken: string}>('auth/login', this.form.value).subscribe({
                next: (response) => {
                    this.processing.set(false);
                    this.tokenService.setToken(response.accessToken);
                    this.router.navigate(['/dashboard']);
                },
                error: (error) => {
                    this.processing.set(false);
                    this.loginError.set("Nieprawidłowe dane logowania:" + (error?.message || 'Spróbuj ponownie później.'));
                }
            });
        }
    }
}