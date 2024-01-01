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
