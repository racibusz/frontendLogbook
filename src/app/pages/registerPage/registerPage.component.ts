
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { ApiService } from '../../services/api.service';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {TokenService} from '../../services/token.service';
import {MatCardModule} from '@angular/material/card';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
    selector: 'app-register-page',
    imports: [ReactiveFormsModule, CommonModule, MatProgressSpinnerModule, MatButtonModule, MatInputModule, MatCardModule],
    templateUrl: './registerPage.component.html',
    styleUrls: ['./registerPage.component.scss']
})
export class RegisterPageComponent {
    form: FormGroup;
    processing = signal(false);
    loginNotice = signal<string | null>(null);

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
        ],
        confirmEmail: [
            '',
            [
            Validators.required,
            Validators.email
            ]
        ],
        confirmPassword: [
            '',
            [
            Validators.required,
            Validators.minLength(6)
            ]
        ]
        }, { validators: [this.matchValidator('email', 'confirmEmail'), this.matchValidator('password', 'confirmPassword')] });
    }

    matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
        const control = abstractControl.get(controlName);
        const matchingControl = abstractControl.get(matchingControlName);

        if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
            return null;
        }

        if (control!.value !== matchingControl!.value) {
          const error = { confirmedValidator: 'Passwords do not match.' };
          matchingControl!.setErrors(error);
          return error;
        } else {
          matchingControl!.setErrors(null);
          return null;
        }
    }
  }
    onSubmit() {
        if(this.form.valid) {
            this.processing.set(true);
            this.apiService.postData('auth/register', this.form.value).subscribe({
                next: (response) => {
                    this.processing.set(false);
                    this.loginNotice.set("Rejestracja udana! Możesz się teraz zalogować.");
                },
                error: (error) => {
                    this.processing.set(false);
                    this.loginNotice.set("Rejestracja nie powiodła się");
                }
            });
        }
        else{
            this.form.markAllAsTouched();
        }
    }
    clearLoginNotice() {
        this.loginNotice.set(null);
    }
}