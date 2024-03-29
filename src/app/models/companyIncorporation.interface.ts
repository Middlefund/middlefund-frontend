import { messageData } from './interfaces';
import * as url from 'url';

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

export interface ImessageDataTypeCompany extends ImessageDataType {
  company: ICompanyInformation;
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

export interface Icart {
  count: number;
  companyPrice: number;
  tinPrice: number;
  companyType: string;
  total: number;
}

export interface IHubtelRequest {
  amount: number;
  title: string;
  description: string;
  clientReference: string;
  callbackUrl: string;
  cancellationUrl: string;
  returnUrl: string;
  logo: string;
}

export interface IHubtelResponse {
  message: string;
  code: string;
  data: {
    paylinkId: string;
    clientReference: string;
    paylinkUrl: string;
    expireIn: number;
  };
}
