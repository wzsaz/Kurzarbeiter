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
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      id ? this.loadEmployee(id) : this.initializeNewEmployeeForm();
    });
    this.loadQualifications();
  }

  private loadEmployee(id: string) {
    this.employeeService.getEmployee(+id).subscribe(employee => {
      if (employee) {
        this.employee = employee;
        this.editorForm.patchValue(employee);
      } else {
        console.error('Employee not found');
      }
    });
  }

  private initializeNewEmployeeForm() {
    this.editorForm.reset({
      id: 0,
      firstName: '',
      lastName: '',
      phone: '',
      street: '',
      postcode: '',
      city: '',
      skillSet: []
    });
  }

  private loadQualifications() {
    this.qualificationService.getQualifications().subscribe(
      qualifications => {
        this.qualifications = qualifications;
        const qualificationsFormArray = this.fb.array(
          qualifications.map(() => this.fb.control(false))
        );
        this.editorForm.setControl('qualifications', qualificationsFormArray);
      });
  }

  onSave() {
    if (this.editorForm.valid) {
      const employeeRequestDTO = this.mapToRequestDTO(this.editorForm.value);
      const operation = this.employee.id
        ? this.employeeService.updateEmployee(this.employee.id, employeeRequestDTO)
        : this.employeeService.createEmployee(employeeRequestDTO);

      operation.subscribe({
        next: response =>     this.router.navigate(['/view']).then(() => console.log('navigated to view')),
        error: error => this.displayError(`Error ${this.employee.id ? 'updating' : 'creating'} employee: ${error}`)
      });
    } else {
      this.displayError('Form is invalid');
    }
  }

  private mapToRequestDTO(formValue: any): EmployeeRequestDTO {
    const selectedQualificationIds = formValue.qualifications
      .map((isSelected: boolean, index: number) => isSelected ? this.qualifications[index].id : null)
      .filter((id: number | null) => id !== null);

    return {
      ...formValue,
      skillSet: selectedQualificationIds
    };
  }

  private displayError(message: string) {
    console.error(message);
    // Here you could implement a more user-friendly error display, like a toast or a dialog
  }
}
