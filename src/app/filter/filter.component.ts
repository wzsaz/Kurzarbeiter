import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Employee, Qualification} from "../types";
import {EmployeesComponent} from "../employees/employees.component";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatBadge} from "@angular/material/badge";
import {MatListSubheaderCssMatStyler} from "@angular/material/list";
import {MatCheckbox} from "@angular/material/checkbox";
import {QualificationService} from "../service/qualification.service";
import {EmployeeService} from "../service/employee.service";
import {forkJoin} from "rxjs";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelActionRow, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {AutocompleteComponent} from "../autocomplete/autocomplete.component";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    EmployeesComponent,
    NgForOf,
    AsyncPipe,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatBadge,
    MatListSubheaderCssMatStyler,
    MatCheckbox,
    MatExpansionPanel,
    MatAccordion,
    MatExpansionPanelActionRow,
    AutocompleteComponent,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() filteredEmployees = new EventEmitter<Employee[]>();

  private employeesToFilter: Employee[] = [];
  protected allQualifications: Qualification[] = [];
  protected form: FormGroup;

  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  protected firstNameOptions: string[] = [];
  protected lastNameOptions: string[] = [];
  protected cityOptions: string[] = [];
  protected phoneOptions: string[] = [];
  protected streetOptions: string[] = [];
  protected postcodeOptions: string[] = [];

  get qualificationsFormArray(): FormArray {
    return this.form.controls['qualifications'] as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private qs: QualificationService,
    private es: EmployeeService
  ) {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      city: [''],
      phone: [''],
      street: [''],
      postcode: [''],
      qualifications: this.fb.array([])
    });
  }

  ngOnInit() {
    forkJoin({
      employees: this.es.getEmployees(),
      qualifications: this.qs.getQualifications()
    }).subscribe(({employees, qualifications}) => {
      this.employeesToFilter = employees;
      this.allQualifications = qualifications;

      this.qualificationsFormArray.clear();
      this.allQualifications.forEach(() => {
        this.qualificationsFormArray.push(this.fb.control(false));
      });

      this.filterEmployees();
    });

    this.form.valueChanges.subscribe(() => {
      this.firstNameOptions = [...new Set(this.employeesToFilter.map(employee => employee.firstName))];
      this.lastNameOptions = [...new Set(this.employeesToFilter.map(employee => employee.lastName))];
      this.cityOptions = [...new Set(this.employeesToFilter.map(employee => employee.city))];
      this.phoneOptions = [...new Set(this.employeesToFilter.map(employee => employee.phone))];
      this.streetOptions = [...new Set(this.employeesToFilter.map(employee => employee.street))];
      this.postcodeOptions = [...new Set(this.employeesToFilter.map(employee => employee.postcode))];
      this.filterEmployees();
    });
  }

  private filterEmployees() {
    const {firstName, lastName, city, phone} = this.form.value;

    const filteredEmployees = this.employeesToFilter.filter(employee => {
      const firstNameMatch = !firstName || employee.firstName.includes(firstName);
      const lastNameMatch = !lastName || employee.lastName.includes(lastName);
      const cityMatch = !city || employee.city.includes(city);
      const phoneMatch = !phone || employee.phone.includes(phone);
      const streetMatch = !this.form.value.street || employee.street.includes(this.form.value.street);
      const postcodeMatch = !this.form.value.postcode || employee.postcode.includes(this.form.value.postcode);

      const qualificationMatches = this.allQualifications.every((qualification, index) => {
        const employeeHasQualification = employee.skillSet.some(({id}) => id === qualification.id);
        return !this.qualificationsFormArray.value[index] || employeeHasQualification;
      });

      return firstNameMatch && lastNameMatch && cityMatch && phoneMatch && streetMatch && postcodeMatch && qualificationMatches;
    });

    this.filteredEmployees.emit(filteredEmployees);
  }
}
