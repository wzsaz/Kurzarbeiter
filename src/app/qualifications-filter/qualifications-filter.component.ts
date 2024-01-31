import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {QualificationService} from '../service/qualification.service';
import {Qualification} from '../types';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-qualifications-filter',
  templateUrl: './qualifications-filter.component.html',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ],
  styleUrls: ['./qualifications-filter.component.css']
})
export class QualificationsFilterComponent implements OnInit {
  @Output() filteredQualifications = new EventEmitter<Qualification[]>();
  filterControl = new FormControl();
  qualifications: Qualification[] = [];

  constructor(private qualificationService: QualificationService) {
  }

  ngOnInit(): void {
    this.qualificationService.getQualifications().subscribe(qualifications => {
      this.qualifications = qualifications;
      this.filterQualifications();
    });

    this.filterControl.valueChanges.subscribe(() => this.filterQualifications());
  }

  private filterQualifications(): void {
    const filterValue = this.filterControl.value;
    if (filterValue) {
      const filteredQualifications = this.qualifications.filter(qualification => qualification.skill.includes(filterValue));
      this.filteredQualifications.emit(filteredQualifications);
    } else {
      this.filteredQualifications.emit(this.qualifications);
    }
  }
}
