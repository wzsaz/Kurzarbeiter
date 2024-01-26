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
import {forkJoin, of} from "rxjs";
import {CanComponentDeactivate} from "../service/can-deactivate-guard.service";

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
export class EditorComponent implements OnInit, CanComponentDeactivate {
  @Input() employee!: Employee;
  editorForm: FormGroup;
  qualifications: Qualification[] = [];
  saving: boolean = false;

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
      phone: ['', [Validators.required, Validators.pattern('^\\+?[1-9]\\d{1,14}$')]], // E.164 phone number pattern
      street: ['', Validators.required],
      postcode: ['', [Validators.minLength(5), Validators.maxLength(9), Validators.pattern('^[0-9]{5,9}$')]], // Assuming postcode is numeric and 5-9 characters long
      city: ['', Validators.required],
      qualifications: this.fb.array([])
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      forkJoin({
        qualifications: this.qualificationService.getQualifications(),
        employee: id ? this.employeeService.getEmployee(+id) : of(null)
      }).subscribe(({ qualifications, employee }) => {
        this.qualifications = qualifications;
        const qualificationsFormArray = this.fb.array(
          qualifications.map(() => this.fb.control(false))
        );
        this.editorForm.setControl('qualifications', qualificationsFormArray);

        this.patchForm(employee);
      });
    });
  }

  private patchForm(employee: Employee | null): void {
    if (employee) {
      this.employee = employee;
      this.editorForm.patchValue({
        ...employee,
        qualifications: this.qualifications.map(qualification =>
          employee.skillSet.some(q => q.id === qualification.id)
        )
      });
    } else {
      this.onClear();
    }
  }

  onSave() {
    if (!this.editorForm.valid) {
      this.displayError('Form is invalid');
    } else {
      this.saving = true;
      const employeeRequestDTO = this.mapToRequestDTO(this.editorForm.value);
      const operation = this.employee.id
        ? this.employeeService.updateEmployee(this.employee.id, employeeRequestDTO)
        : this.employeeService.createEmployee(employeeRequestDTO);

      operation.subscribe({
        next: () => this.router.navigate(['/view']),
        error: error => this.displayError(`Error ${this.employee.id ? 'updating' : 'creating'} employee: ${error}`)
      });
    }
  }

  onClear() {
    this.employee = this.editorForm.value; // TODO: is this correct? No obvious errors.

    this.editorForm.patchValue({
      id: -1,
      firstName: '',
      lastName: '',
      phone: '',
      street: '',
      postcode: '',
      city: '',
      qualifications: this.qualifications.map(() => false)
    });
  }

  hasUnsavedChanges(): boolean {
    if (this.saving) {
      this.saving = false;
      return false;
    }
    return this.editorForm.dirty && !this.editorForm.pristine;
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
