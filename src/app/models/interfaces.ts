export interface messageData {
  message: string,
  data: any
}

export interface pitchData {
  "startupName": string;
  "registrationInfo": string
  "registrationCountry": string
  "industry": string
  "stage": string
  "location": {
    "country": string
    "region": string
    "city": string
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



