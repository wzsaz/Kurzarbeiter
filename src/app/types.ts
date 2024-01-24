export interface EmployeeRequestDTO {
  lastName: string;
  firstName: string;
  street: string;
  postcode: string;
  city: string;
  phone: string;
  skillSet: number[];
}

export interface EmployeeResponseDTO {
  id: number;
  lastName: string;
  firstName: string;
  street: string;
  postcode: string;
  city: string;
  phone: string;
  skillSet: QualificationResponseDTO[];
}

export interface QualificationRequestDTO {
  skill: string;
}

export interface QualificationResponseDTO {
  skill: string;
  id: number;
}

export interface EmployeeNameAndSkillDataDTO {
  id: number;
  lastName: string;
  firstName: string;
  skillSet: QualificationRequestDTO[];
}

export interface TokenResponseDTO {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  'not-before-policy': number;
  session_state: string;
  scope: string;
}

export interface EmployeeUIState extends EmployeeResponseDTO {
  showDetails: boolean;
  pictureUrl: string;
}

export interface QualificationUIState extends QualificationResponseDTO {
}
