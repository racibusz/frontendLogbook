import { Component, Directive, Input, signal } from '@angular/core';
import { ApiService } from '../../app/services/api.service';
import {userDTO} from '../../app/user_page/userDTO';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Directive()
export abstract class InfoFieldTemplate {
    editing = signal(false);
    @Input() user!: userDTO;
    @Output() changed = new EventEmitter<boolean>();
    onChange() {
        this.changed.emit(true);
    }
    editClick() {
        this.editing.set(true);
    }
    ngOnChanges(changes: any) {
        if (changes['user']) {
            this.editing.set(false);
        }
    }
}