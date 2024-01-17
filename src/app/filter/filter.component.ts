import { Component, EventEmitter, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgIf
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() applyFilter = new EventEmitter<string>();
  filterOpen = false;

  toggleFilter(): void {
    this.filterOpen = !this.filterOpen;
  }

  onFilterChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.applyFilter.emit(value);
  }
}
