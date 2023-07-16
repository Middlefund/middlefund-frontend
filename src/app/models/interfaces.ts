export interface messageData {
  message: string,
  data: any
}

export interface pitch {
  "startupName": string;
  "registrationInfo": any
  "registrationCountry": any
  "industry": any
  "stage": any
  "location": {
    "country": any
    "region": any
    "city": any
  };
  "social": {
    "website": string;
    "linkedIn": string;
  }
  "raisedAmount": string
  amountToRaise: string
  purpose: string
  equity: string
  startupBio: string
  repName: string;
  position: string;
  repBio: string;
}

export interface startupProfile {
  "startupName": null | string | undefined;
  "registrationInfo": string | null;
  "registrationCountry": string | null;
  "industry": string | null;
  "stage": string | null;
  "location": {
    "country": string | null;
    "region": string | null;
    "city": string | null;
  };
  "social": {
    "website": string;
    "linkedIn": string;
  }
}
export interface pitchDetails {
  "raisedAmount": string | null;
  amountToRaise: string | null;
  purpose: string | null;
  equity: string | null;
  startupBio: string | null;
}

export interface repDetails {
  repName: string;
  position: string;
  linkedIn: string;
  repBio: string;
}

export interface pitchData {
  "startupName": string;
  "registrationInfo": any;
  "registrationCountry": any;
  "industry": any;
  "stage": any;
  "country": any;
  "region": any;
  "city": any;
  "website": string;
  "linkedIn": string;
  "raisedAmount": any;
  amountToRaise: any;
  purpose: any;
  equity: string;
  startupBio: string;
  repName: string;
  position: string;
  rep_linkedIn: string;
  repBio: string;
  logo: string;
  pitch: string,
  video: string,
  repId: any
  verified: string
}

export interface startupData {
  id: string;
  user_id: string;
  startup_name: string;
  registration_type: any;
  registration_country: any;
  industry: any;
  stage: any;
  country: any;
  region_state: any;
  city: any;
  website: string;
  linkedin: string;
  raised_amount: any;
  amount_to_raise: string;
  purpose: any;
  equity: string;
  startup_bio: string;
  rep_name: string;
  rep_position: string;
  rep_linkedin: string;
  rep_short_bio: string;
  logo: string;
  pitch_deck: string;
  video_pitch: string;
  rep_id: string;
  verified: string;
  created_at: string;
  updated_at: string;
}

export interface supportingDocs {
  logo: string;
  pitch: string,
  video: string,
  id: string
}

export interface NotificationData {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: string;
  data: {
    title: string;
    message: string;
    type: string;
  }
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface InvestorData {
  id: string;
  user_id: string;
  user_type: string | null;
  organization_name: string | null;
  investment_stage: string | null;
  position: string | null;
  interests: string[] | null;
  commitment: number | null;
  min_cheque_size: number | null;
  max_cheque_size: number | null;
  linkedIn: string | null;
  twitter: string | null;
  id_type: string;
  id_card: string;
  proof_type: string;
  proof: string;
  status: string;
  created_at: string;
  updated_at: string;
}



