import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {EmployeeRequestDTO, Qualification} from "../types";
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
import {CanComponentDeactivate} from "../service/can-deactivate-guard.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

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
    SlicePipe,
    MatGridList,
    MatGridTile
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit, CanComponentDeactivate {
  protected form: FormGroup;
  protected allQualifications: Qualification[] = [];

  private INVALID_ID: number = -1;

  private saving: boolean = false;

  protected get qualificationsFormArray() {
    return this.form.controls['qualifications'] as FormArray;
  }

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private qualificationService: QualificationService
  ) {
    this.form = this.fb.group({
      id: [this.INVALID_ID],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      street: ['', Validators.required],
      postcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(9), Validators.pattern('^[0-9]{5,9}$')]], // Assuming postcode is numeric and 5-9 characters long
      city: ['', Validators.required],
      qualifications: this.fb.array([])
    });
  }

  get editingValidId(): boolean {
    return typeof this.form.value.id === 'number' && this.form.value.id !== this.INVALID_ID;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.employeeService.getEmployee(+id).subscribe(employee => {
          this.form.patchValue(employee);
          this.setupQualifications(employee.skillSet);
        });
      } else {
        this.setupQualifications([]);
      }
    });
  }

  private setupQualifications(existingQualifications: Qualification[]) {
    this.qualificationService.getQualifications().subscribe(qualifications => {
      this.allQualifications = qualifications;
      this.qualificationsFormArray.clear()
      qualifications.map(qualification => {
        const isQualified = existingQualifications.some(eq => eq.id === qualification.id);
        return this.fb.control(isQualified);
      }).forEach(q => {
        this.qualificationsFormArray.push(q);
      })
    });
  }

  onSave() {
    if (this.form.invalid) {
      this.snackBar.open('Form is invalid', 'Close', {duration: 3000});
      return;
    }
    this.saving = true;

    const employeeRequestDTO = this.mapToRequestDTO(this.form.value);
    const saveOperation = this.editingValidId
      ? this.employeeService.updateEmployee(this.form.value.id, employeeRequestDTO)
      : this.employeeService.createEmployee(employeeRequestDTO);

    saveOperation.subscribe({
      next: () => {
        this.snackBar.open(`${employeeRequestDTO.firstName} ${employeeRequestDTO.lastName} was saved`, 'Close', {duration: 3000});
        this.router.navigate(['/view']).then();
      },
      error: error => console.error(`Error ${this.form.value.id ? 'updating' : 'creating'} employee: ${error.toString()}`)
    });
  }

  onClear() {
    this.form.reset({id: this.form.value.id});
    this.qualificationsFormArray.controls.forEach(control => control.setValue(false));
  }

  hasUnsavedChanges(): boolean {
    if (this.saving) {
      this.saving = false;
      return false;
    }
    return this.form.dirty && !this.form.pristine;
  }

  private mapToRequestDTO(formValue: any): EmployeeRequestDTO {
    // @ts-ignore
    const selectedQualificationIds: number[] = this.qualificationsFormArray.controls
      .map((control, index) => control.value ? this.allQualifications[index].id : null)
      .filter(id => id !== null);

    return {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      phone: formValue.phone,
      street: formValue.street,
      postcode: formValue.postcode,
      city: formValue.city,
      skillSet: selectedQualificationIds
    };
  }
}
