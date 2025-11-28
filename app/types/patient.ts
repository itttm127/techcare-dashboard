export interface BloodPressure {
  systolic: {
    value: number;
    levels: string;
  };
  diastolic: {
    value: number;
    levels: string;
  };
}

export interface VitalSigns {
  respiratory_rate?: {
    value: number;
    levels: string;
  };
  temperature?: {
    value: number;
    levels: string;
  };
  heart_rate?: {
    value: number;
    levels: string;
  };
}

export interface DiagnosisHistoryItem {
  month: string;
  year: number;
  blood_pressure?: BloodPressure;
  respiratory_rate?: {
    value: number;
    levels: string;
  };
  temperature?: {
    value: number;
    levels: string;
  };
  heart_rate?: {
    value: number;
    levels: string;
  };
}

export interface DiagnosticItem {
  name: string;
  description: string;
  status: string;
}

export interface Patient {
  name: string;
  date_of_birth: string;
  gender: string;
  phone_number: string;
  emergency_contact: string;
  insurance_type: string;
  lab_results: string[];
  diagnostic_list: DiagnosticItem[];
  diagnosis_history: DiagnosisHistoryItem[];
}

