import { Component, Input, signal } from '@angular/core';
import { ApiService } from '../../app/services/api.service';
import {userDTO} from '../../app/user_page/userDTO';
import {FormsModule} from '@angular/forms';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { InfoFieldTemplate } from '../user-info/info-field-template';

@Component({
    selector: 'user-address',
    templateUrl: './user-address.component.html',
    imports: [FormsModule]
})
export class UserAddressComponent extends InfoFieldTemplate{}