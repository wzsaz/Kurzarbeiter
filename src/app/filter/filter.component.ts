import {Component, Input, OnChanges} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Employee} from "../types";
import {EmployeesComponent} from "../employees/employees.component";
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatCheckbox} from "@angular/material/checkbox";
import {map} from "rxjs/operators";
import {Observable, startWith} from "rxjs";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";

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
    MatAutocomplete,
    MatOption,
    AsyncPipe,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatCheckbox,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatAccordion,
    MatExpansionPanelDescription
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnChanges {
  @Input() employeesToFilter: Employee[] = [];
  filteredEmployees: Employee[] = [];

  firstNameFilter = new FormControl();
  lastNameFilter = new FormControl();
  cityFilter = new FormControl();
  phoneFilter = new FormControl();

  firstNameOptions: string[] = [];
  lastNameOptions: string[] = [];
  cityOptions: string[] = [];
  phoneOptions: string[] = [];

  filteredFirstNameOptions: Observable<string[]>;
  filteredLastNameOptions: Observable<string[]>;
  filteredCityOptions: Observable<string[]>;
  filteredPhoneOptions: Observable<string[]>;

  constructor() {
    this.filteredFirstNameOptions = this.firstNameFilter.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.firstNameOptions))
    );

    this.filteredLastNameOptions = this.lastNameFilter.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.lastNameOptions))
    );

    this.filteredCityOptions = this.cityFilter.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.cityOptions))
    );

    this.filteredPhoneOptions = this.phoneFilter.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.phoneOptions))
    );
  }

  ngOnChanges() {
    this.firstNameOptions = [...new Set(this.employeesToFilter.map(employee => employee.firstName))];
    this.lastNameOptions = [...new Set(this.employeesToFilter.map(employee => employee.lastName))];
    this.cityOptions = [...new Set(this.employeesToFilter.map(employee => employee.city))];
    this.phoneOptions = [...new Set(this.employeesToFilter.map(employee => employee.phone))];

    this.filterEmployees();
  }

  filterEmployees() {
    const firstName = this.firstNameFilter.value;
    const lastName = this.lastNameFilter.value;
    const city = this.cityFilter.value;
    const phone = this.phoneFilter.value;

    this.filteredEmployees = this.employeesToFilter.filter(employee => {
      const firstNameMatches = !firstName || employee.firstName.includes(firstName);
      const lastNameMatches = !lastName || employee.lastName.includes(lastName);
      const cityMatches = !city || employee.city.includes(city);
      const phoneMatches = !phone || employee.phone.includes(phone);

      return firstNameMatches && lastNameMatches && cityMatches && phoneMatches;
    });
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();

    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
