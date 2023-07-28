import {FormControl} from "@angular/forms";

export interface loginData {
  token: object
  user: object
  // ... other properties
}

export interface registerMessage {
  message: string
}

export interface startupProfile {
  startupName: string
  registrationInfo: string
  industry: string
  registrationCountry: string
  stage: string
  location: {
    country: string
    city: string
    region: string
  }
  social: {
    website: string
    linkedIn: string
  }
}

export interface InvestorFormControls {
  organizationName: FormControl;
  investmentStage: FormControl;
  position: FormControl;
  interests: FormControl;
  commitment: FormControl;
  minChequeSize: FormControl;
  maxChequeSize: FormControl;
  linkedIn: FormControl;
  twitter: FormControl;
}

export interface InvestorSettings {
  commitment: string;
  created_at: string;
  id: string;
  id_card: string;
  id_type: string;
  interests: string;
  investment_stage: string;
  linkedIn: string;
  max_cheque_size: string;
  min_cheque_size: string;
  organization_name: string;
  position: string;
  proof: string;
  proof_type: string;
  status: string;
  twitter: string;
  updated_at: string;
  user_id: string;
  user_type: string;
}

