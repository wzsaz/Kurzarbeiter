export interface EmployeeRequest {
  lastName: string;
  firstName: string;
  street: string;
  postcode: string;
  city: string;
  phone: string;
  skillSet: number[];
}

export interface Employee {
  readonly id: number;
  lastName: string;
  firstName: string;
  street: string;
  postcode: string;
  city: string;
  phone: string;
  skillSet: Qualification[];
}

export interface Qualification {
  readonly id: number;
  skill: string;
}
