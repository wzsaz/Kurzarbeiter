import {Component, Input, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {EmployeeRequestDTO, EmployeeResponseDTO} from "../types";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {EmployeeService} from "../employee.service";
import {ActivatedRoute} from "@angular/router";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements OnInit {
  @Input() employee!: EmployeeResponseDTO;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployee(+id).subscribe(employee => {
        if (employee) {
          this.employee = employee;
          console.log('EditorComponent initialized', this.employee);
        } else {
          console.log('EditorComponent could not find employee with id', id);
        }
      });
    }
  }

  // other methods...
  onSave(employee: EmployeeRequestDTO) {
    this.employeeService.createEmployee(employee)
  }
}
