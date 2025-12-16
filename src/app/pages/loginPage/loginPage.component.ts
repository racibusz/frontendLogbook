
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 

@Component({
    selector: 'app-login-page',
    imports: [ReactiveFormsModule, CommonModule, MatProgressSpinnerModule],
    templateUrl: './loginPage.component.html',
    styleUrls: ['./loginPage.component.scss']
})
export class LoginPageComponent {
    form: FormGroup;
    processing = signal(false);

    constructor(private fb: FormBuilder) {
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
    onSubmit() {
        this.processing.set(true);
    }
}