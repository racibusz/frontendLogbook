import {
  Component,
  WritableSignal,
  Input,
  signal,
  effect,
  Signal,
  inject,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsDTO } from '../../../DTOs/detailsDTO';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { resolvePath } from '../itemsFunctions';
import { MobileDetector } from '../../../services/mobileDetector';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { Dialog } from '../../dialog/dialog.component';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

// This component is responsible for displaying the details of an item.
// Due to its universal nature, it uses ANY as a type which is not ideal. Propably will figure it out in the future.

@Component({
  selector: 'app-item-details',
  templateUrl: './itemDetails.component.html',
  styleUrls: ['./itemDetails.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatIconModule,
    MatDialogModule,
    Dialog,
    RouterModule,
    MatFormField,
    MatInputModule,
    FormsModule,
  ],
})
export class ItemDetailsComponent {
  constructor() {
    effect(() => {
      const item = this.item();

      if (item) {
        this.changes.set(null);
      }
    });
  }

  @Input() item!: WritableSignal<Record<string, any> | null>;
  @Input() sections!: DetailsDTO;
  changes = signal<Record<string, any> | null>(null);
  readonly dialog = inject(MatDialog);

  private fieldComputeds = new Map<string, Signal<any>>();

  mobileDetector = inject(MobileDetector);
  isMobile = this.mobileDetector.isMobile;

  canEdit = computed(() => {
    if (this.item() == null) return false;
    return resolvePath('{{canEdit}}', this.item()) == 'true';
  });

  @Input() delete!: (item: Object | null) => void;
  @Input() saveChanges!: (
    originalItem: Object | null,
    changes: Object | null,
  ) => void;

  resolvePath = resolvePath;

  getFieldValueComputed(key: string) {
    if (!this.fieldComputeds.has(key)) {
      this.fieldComputeds.set(
        key,
        computed(() => {
          const source = this.changes() ?? this.item();
          return resolvePath(key, source);
        }),
      );
    }

    return this.fieldComputeds.get(key)!;
  }

  setValue(key: string, rawValue: string, format: string | null) {
    const cleanKey = key.replace(/[{}]/g, '').trim();

    let value = rawValue;

    const formatted = this.applyFormat(value, format);

    if (formatted) value = formatted;

    const path = cleanKey.split('.');
    this.changes.update((ch) => {
      if (!ch) return ch;
      const updated = structuredClone(ch!);
      let ref: any = updated;

      for (let i = 0; i < path.length - 1; i++) {
        ref = ref[path[i]];
      }

      ref[path[path.length - 1]] = value;
      return updated;
    });
  }

  applyFormat(value: string, format: string | null): string | undefined {
    if (!format) return value;
    if (format === 'UPPERCASE') {
      value = value.toUpperCase();
      return value;
    }
    const regex = new RegExp(format, 'g');
    const matches = value.match(regex);
    if (!matches) {
      return undefined;
    } else {
      value = matches.join('');
    }
    return value;
  }
  askForDeleting(item: Object | null) {
    this.ask('Czy na pewno chcesz usunąć ten element?').then((result) => {
      if (result) {
        this.delete(item);
      }
    });
  }
  switchEditing(): void {
    if (this.changes() === null) {
      this.changes.set(structuredClone(this.item()!));
    } else {
      this.ask(
        'Czy na pewno chcesz wyjść z trybu edycji? Wszystkie niezapisane zmiany zostaną utracone.',
      ).then((result) => {
        if (result) {
          this.changes.set(null);
        }
      });
    }
  }
  async ask(text: string): Promise<boolean> {
    const dialogRef = this.dialog.open(Dialog);
    let instance = dialogRef.componentInstance;
    instance.text = text;
    const result = await firstValueFrom(dialogRef.afterClosed());
    return result === true;
  }
}
