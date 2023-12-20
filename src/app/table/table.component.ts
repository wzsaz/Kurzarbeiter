import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MockEmployeeService} from "../mock-employee.service";

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

  constructor(private employeeService: MockEmployeeService) { }

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
