import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
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

  constructor(private employeeService: EmployeeService, private changeDetectorRefs: ChangeDetectorRef) {
  }

  async ngOnInit() {
    const employees$ = await this.employeeService.getEmployees();
    employees$.subscribe((data: any) => {
      this.employees = data;
      console.log(this.employees);
      this.changeDetectorRefs.detectChanges(); // Manually trigger change detection
    });
  }

  onItemClicked(employee: any) {
    this.itemClicked.emit(employee);
  }
}
