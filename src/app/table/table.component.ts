import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {EmployeeService} from "../employee.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [
    MatTableModule
  ],
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  employees: any[] = [];
  @Output() itemClicked = new EventEmitter<any>();

  constructor(private employeeService: EmployeeService) { }

  async ngOnInit() {
    const employees$ = await this.employeeService.getEmployees();
    employees$.subscribe((data: any) => {
      this.employees = data;
      console.log(this.employees);
    });
  }

  onItemClicked(employee: any) {
    this.itemClicked.emit(employee);
  }
}
