import {Component, Input, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {Employee, EmployeeRequestDTO, Qualification} from "../types";
import {FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ActivatedRoute, Router} from "@angular/router";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {EmployeeService} from "../service/employee.service";
import {QualificationService} from "../service/qualification.service";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    MatButtonModule,
    NgIf,
    NgForOf,
    MatCheckboxModule,
    MatIconModule,
    SlicePipe
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements OnInit {
  @Input() employee!: Employee;
  qualifications: Qualification[] = [];

  editorForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    street: ['', Validators.required],
    postcode: ['', Validators.required],
    city: ['', Validators.required],
    qualifications: this.fb.array([])
  });

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService, private qualificationService: QualificationService) {
  }

  ngOnInit() {
    this.qualificationService.getQualifications().subscribe(qualifications => {
      this.qualifications = qualifications.map((old: Qualification) => ({
        skill: old.skill,
        id: old.id
      }));
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.employeeService.getEmployee(+id).subscribe(employee => {
          if (employee) {
            this.employee = employee;
            this.editorForm.patchValue({
              firstName: employee.firstName,
              lastName: employee.lastName,
              phone: employee.phone,
              street: employee.street,
              postcode: employee.postcode,
              city: employee.city,
            });
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
      this.qualifications.forEach(qualification => {
        this.qualificationsArray.push(this.fb.group({
          skill: [qualification.skill, Validators.required]
        }));
      });
    });
  }

  get qualificationsArray() {
    return this.editorForm.get('qualifications') as FormArray;
  }

  onSave() {
    if (this.editorForm.valid) {
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
    } else {
      console.log('Form invalid --> No handling implemented yet');
    }
  }

  mapToRequestDTO(employee: Employee): EmployeeRequestDTO {
    return {
      lastName: employee.lastName,
      firstName: employee.firstName,
      street: employee.street,
      postcode: employee.postcode,
      city: employee.city,
      phone: employee.phone,
      skillSet: Array.isArray(employee.skillSet) ? employee.skillSet.map(skill => skill.id) : [], // Check if skillSet is an array before mapping
    };
  }
}
