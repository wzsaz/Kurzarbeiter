import {Component, Input, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {EmployeeRequestDTO, EmployeeResponseDTO, QualificationGetDTO} from "../types";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {EmployeeService} from "../employee.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {QualificationService} from "../qualification.service";

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    MatButtonModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements OnInit {
  @Input() employee!: EmployeeResponseDTO;
  qualifications: QualificationGetDTO[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService, private qualificationService: QualificationService) { }

  ngOnInit() {
    this.qualificationService.getQualifications().subscribe(qualifications => {
      this.qualifications = qualifications;
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployee(+id).subscribe(employee => {
        if (employee) {
          this.employee = employee;
          console.log('EditorComponent initialized', this.employee);
        } else {
          console.log('EditorComponent could not find employee with id', id);
        }
      });
    } else {
      this.employee = {
        id: 0,
        lastName: '',
        firstName: '',
        street: '',
        postcode: '',
        city: '',
        phone: '',
        skillSet: [],
      };
    }
  }

  onSave() {
    const employeeRequestDTO = this.mapToRequestDTO(this.employee);
    if (this.employee.id) {
      this.employeeService.updateEmployee(this.employee.id, employeeRequestDTO).subscribe({
        next: response => {
          console.log('Employee updated', response);
          this.router.navigate(['/view']).then(() => {
            console.log('Navigation completed');
          });
        },
        error: error => {
          console.error('Error updating employee', error);
        }
      });
    } else {
      this.employeeService.createEmployee(employeeRequestDTO).subscribe({
        next: response => {
          console.log('Employee created', response);
          this.router.navigate(['/view']).then(() => {
            console.log('Navigation completed');
          });
        },
        error: error => {
          console.error('Error creating employee', error);
        }
      });
    }
  }

  mapToRequestDTO(employee: EmployeeResponseDTO): EmployeeRequestDTO {
    return {
      lastName: employee.lastName,
      firstName: employee.firstName,
      street: employee.street,
      postcode: employee.postcode,
      city: employee.city,
      phone: employee.phone,
      skillSet: employee.skillSet.map(skill => skill.id), // Assuming skillSet in EmployeeResponseDTO is an array of objects with an id property
    };
  }
}
