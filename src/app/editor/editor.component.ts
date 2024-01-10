import {Component, Input, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {EmployeeResponseDTO} from "../types";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {EmployeeService} from "../employee.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
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
}
