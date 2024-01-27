import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Employee} from "../types";
import {EmployeesComponent} from "../employees/employees.component";
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatListModule} from "@angular/material/list";

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
    MatListModule
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnChanges, OnInit {
  @Input() employeesToFilter: Employee[] = [];
  filteredEmployees: Employee[] = [];

  filterForm = new FormGroup({
    id: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    city: new FormControl(),
    phone: new FormControl(),
    street: new FormControl(),
    postcode: new FormControl(),
  });

  firstNameOptions: string[] = [];
  lastNameOptions: string[] = [];
  cityOptions: string[] = [];
  phoneOptions: string[] = [];
  streetOptions: string[] = [];
  postcodeOptions: string[] = [];

  getFilteredOptions(options: string[], input: string): string[] {
    if (!input) {
      return options;
    }
    const filterValue = input.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    this.filterForm.valueChanges.subscribe(() => this.filterEmployees());
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
    const {firstName, lastName, city, phone} = this.filterForm.value;

    this.filteredEmployees = this.employeesToFilter.filter(employee => {
      const firstNameMatch = !firstName || employee.firstName.includes(firstName);
      const lastNameMatch = !lastName || employee.lastName.includes(lastName);
      const cityMatch = !city || employee.city.includes(city);
      const phoneMatch = !phone || employee.phone.includes(phone);
      const streetMatch = !this.filterForm.value.street || employee.street.includes(this.filterForm.value.street);
      const postcodeMatch = !this.filterForm.value.postcode || employee.postcode.includes(this.filterForm.value.postcode);

      return firstNameMatch && lastNameMatch && cityMatch && phoneMatch && streetMatch && postcodeMatch;
    });
  }

  protected readonly Object = Object;
}
