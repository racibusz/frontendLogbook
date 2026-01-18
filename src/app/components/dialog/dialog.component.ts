import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'dialog-confirm-editing-edit-mode',
  template: `
  <mat-dialog-content class="mat-typography">
  <p>{{text}}</p>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
  <button matButton mat-dialog-close>Anuluj</button>
  <button matButton [mat-dialog-close]="true" cdkFocusInitial>Potwierdź</button>
</mat-dialog-actions>`,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
    @Input() text!: string;
}