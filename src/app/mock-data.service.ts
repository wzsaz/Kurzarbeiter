import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockEmployeeService {
  private employees = [
    {id: 1, name: 'John Doe', position: 'Developer'},
    {id: 2, name: 'Jane Doe', position: 'Designer'},
    // Add more employees as needed
  ];

  async getEmployees(): Promise<Observable<any>> {
    return of(this.employees);
  }
}
