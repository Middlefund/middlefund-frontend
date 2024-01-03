import { messageData } from './interfaces';

export interface ICompanyInformation {
  id: string;
  companyName: string;
  companyType: string;
  businessName: string;
  industryName: string;
  activities: string;
  digitalAddress: string;
  houseNumber: string;
  landmark: string;
  region: string;
  city: string;
  district: string;
  boxNumber: string;
  status: string;
}

export interface ImessageDataType extends messageData {
  type: string;
}

export interface ImessageDataStatus extends messageData {
  status: string;
}

export interface IProprietorDirector {
  id: string;
  name: string;
  gender: string;
  dob: string;
  nationality: string;
  birthdate: string;
  email: string;
  phoneNumber: string;
  hasTin: string;
  tin: string;
  ghanaCard: string;
  signature: string;
}
