import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  employees = [
    { id: 1, name: 'John Doe', position: 'Developer' },
    { id: 2, name: 'Jane Doe', position: 'Designer' },
    // Add more employees as needed
  ];

  getEmployees() {
    return this.employees;
  }
}
