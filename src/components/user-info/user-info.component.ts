import { Component, Input, signal } from '@angular/core';
import { ApiService } from '../../app/services/api.service';
import {userDTO} from '../../app/user_page/userDTO';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InfoFieldTemplate } from './info-field-template';

@Component({
    selector: 'user-info',
    templateUrl: './user-info.component.html',
    imports: [FormsModule]
})
export class UserInfoComponent extends InfoFieldTemplate{}