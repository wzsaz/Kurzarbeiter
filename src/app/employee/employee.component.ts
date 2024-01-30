import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardAvatar, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatChip, MatChipListbox} from "@angular/material/chips";
import {MatDivider} from "@angular/material/divider";
import {
  MatExpansionPanel,
  MatExpansionPanelActionRow,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader, MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";
import {Employee} from "../types";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardAvatar,
    MatCardContent,
    MatCardTitle,
    MatChip,
    MatChipListbox,
    MatDivider,
    MatExpansionPanel,
    MatExpansionPanelActionRow,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIcon
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  @Input() employee!: Employee;
  @Output() editedEmployee = new EventEmitter<Employee>();
  @Output() deletedEmployee = new EventEmitter<Employee>();

  onEdit(): void {
    this.editedEmployee.emit(this.employee);
  }

  onDelete(): void {
    this.deletedEmployee.emit(this.employee);
  }

  get profilePicture(): string {
    return 'https://i.pravatar.cc/200?img=' + this.employee!.id % 70;
  }
}
