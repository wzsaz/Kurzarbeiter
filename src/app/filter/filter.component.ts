import {Component, Input, OnChanges, OnInit} from '@angular/core';
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
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnChanges, OnInit {
  @Input() employeesToFilter: Employee[] = [];
  filteredEmployees: Employee[] = [];

  protected form: FormGroup;
  protected allQualifications: Qualification[] = [];

  firstNameOptions: string[] = [];
  lastNameOptions: string[] = [];
  cityOptions: string[] = [];
  phoneOptions: string[] = [];
  streetOptions: string[] = [];
  postcodeOptions: string[] = [];

  protected get qualificationsFormArray() {
    return this.form.controls['qualifications'] as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private qs: QualificationService
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

  getFilteredOptions(options: string[], input: string): string[] {
    if (!input) {
      return options;
    }
    const filterValue = input.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(() => this.filterEmployees());

    this.qs.getQualifications().subscribe(qualifications => {
      this.allQualifications = qualifications;
      this.qualificationsFormArray.clear()
      this.allQualifications.forEach(() => {
        this.qualificationsFormArray.push(this.fb.control(false));
      });
    });
  }

  ngOnChanges() {
    this.firstNameOptions = [...new Set(this.employeesToFilter.map(employee => employee.firstName))];
    this.lastNameOptions = [...new Set(this.employeesToFilter.map(employee => employee.lastName))];
    this.cityOptions = [...new Set(this.employeesToFilter.map(employee => employee.city))];
    this.phoneOptions = [...new Set(this.employeesToFilter.map(employee => employee.phone))];
    this.streetOptions = [...new Set(this.employeesToFilter.map(employee => employee.street))];
    this.postcodeOptions = [...new Set(this.employeesToFilter.map(employee => employee.postcode))];

    this.filterEmployees();
  }

  private filterEmployees() {
    const {firstName, lastName, city, phone} = this.form.value;

    this.filteredEmployees = this.employeesToFilter.filter(employee => {
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
  }
}
