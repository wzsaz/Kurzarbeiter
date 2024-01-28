import { Component } from '@angular/core';
import {EmployeeService} from "../service/employee.service";
import { fakerDE as faker } from '@faker-js/faker'
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Qualification} from "../types";
import {QualificationService} from "../service/qualification.service";

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatLabel,
    MatButton
  ],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css'
})
export class GeneratorComponent {
  numberOfEmployees: number = 0;
  numberOfQualifications: number = 0;
  qualifications: Qualification[] = [];

  constructor(private employeeService: EmployeeService, private qualificationService: QualificationService) {
    this.qualificationService.getQualifications().subscribe(qualifications => {
      this.qualifications = qualifications;
    });
  }

  generateEmployees(): void {
    for (let i = 0; i < this.numberOfEmployees; i++) {
      const randomSkills = this.qualifications
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * (this.qualifications.length + 1)))
        .map(qualification => qualification.id);

      const employeeData = {
        lastName: faker.person.lastName(),
        firstName: faker.person.firstName(),
        street: faker.location.streetAddress(),
        postcode: faker.location.zipCode().substring(0, 5),
        city: faker.location.city(),
        phone: faker.phone.number(),
        skillSet: randomSkills
      };
      this.employeeService.createEmployee(employeeData).subscribe();
    }
  }

  generateQualifications(): void {
    for (let i = 0; i < this.numberOfQualifications; i++) {
      const qualificationData = {
        skill: faker.commerce.department()
      };
      this.qualificationService.createQualification(qualificationData).subscribe(qualification => {
        this.qualifications.push(qualification);
      });
    }
  }
}
