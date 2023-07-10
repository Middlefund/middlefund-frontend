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
