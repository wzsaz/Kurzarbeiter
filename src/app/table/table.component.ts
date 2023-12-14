// src/app/table/table.component.ts
import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MockDataService} from "../mock-data-service.service";


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

  constructor(private mockDataService: MockDataService) { }

  ngOnInit() {
    this.employees = this.mockDataService.getEmployees();
  }

  onItemClicked() {
    // Handle item click
  }
}
