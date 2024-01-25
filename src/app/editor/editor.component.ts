import {Component, Input, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {Employee, EmployeeRequestDTO, Qualification} from "../types";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
  editorForm: FormGroup;
  qualifications: Qualification[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private qualificationService: QualificationService
  ) {
    this.editorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      qualifications: this.fb.array([])
    });
  }

  ngOnInit() {
    this.initializeForm();
    this.loadQualifications();
  }

  private initializeForm() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployee(+id).subscribe(employee => {
        if (employee) {
          this.employee = employee;
          this.editorForm.patchValue(employee);
        } else {
          console.error('Employee not found');
        }
      });
    } else {
      this.employee = {
        id: 0,
        firstName: '',
        lastName: '',
        phone: '',
        street: '',
        postcode: '',
        city: '',
        skillSet: []
      };
    }
  }

  private loadQualifications() {
    this.qualificationService.getQualifications().subscribe(qualifications => {
      this.qualifications = qualifications;
      const qualificationsFormGroups = qualifications.map(qualification =>
        this.fb.group({
          skill: [qualification.skill, Validators.required]
        })
      );
      this.editorForm.setControl('qualifications', this.fb.array(qualificationsFormGroups));
    });
  }

  onSave() {
    if (this.editorForm.valid) {
      const employeeRequestDTO = this.mapToRequestDTO(this.editorForm.value);
      if (this.employee.id) {
        this.employeeService.updateEmployee(this.employee.id, employeeRequestDTO).subscribe(
          response => this.handleResponse(response),
          error => console.error('Error updating employee', error)
        );
      } else {
        this.employeeService.createEmployee(employeeRequestDTO).subscribe(
          response => this.handleResponse(response),
          error => console.error('Error creating employee', error)
        );
      }
    } else {
      console.error('Form is invalid');
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
      skillSet: Array.isArray(employee.skillSet) ? employee.skillSet.map(skill => skill.id) : []
    };
  }

  private handleResponse(response: any) {
    console.log('Employee processed', response);
    this.router.navigate(['/view']).then(() => console.log('navigated to view'));
  }
}
