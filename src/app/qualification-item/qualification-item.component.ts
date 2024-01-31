import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Qualification} from "../types";
import {MatCard, MatCardActions, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-qualification-item',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardActions,
    MatIcon,
    MatIconButton,
    MatCardTitle
  ],
  templateUrl: './qualification-item.component.html',
  styleUrl: './qualification-item.component.css'
})
export class QualificationItemComponent {
  @Input() qualification!: Qualification;
  @Output() editedQualification = new EventEmitter<Qualification>();
  @Output() deletedQualification = new EventEmitter<Qualification>();

  constructor() {
  }

  onEdit() {
    this.editedQualification.emit(this.qualification);
  }

  onDelete() {
    this.deletedQualification.emit(this.qualification);
  }
}
