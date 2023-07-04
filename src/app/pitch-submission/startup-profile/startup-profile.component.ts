import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PitchSubmissionService} from "../pitch-submission.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {City, Country, ICountry, State} from "country-state-city";
import {Router} from "@angular/router";
import {FormDataAppender} from "../../utility/formDataAppender";
import {pitchData, startupData} from "../../models/interfaces";

@Component({
  selector: 'app-startup-profile',
  templateUrl: './startup-profile.component.html',
  styleUrls: ['./startup-profile.component.css']
})
export class StartupProfileComponent implements OnInit{
  industries: Array<{name: string, value: string}> = []
  loadingIndustries: boolean = false
  registrationInfo: Array<{name: string, value: string}> = [
    {name: "Sole proprietorship", value: "Sole proprietorship"},
    {name: "Limited Liability Company (LLC)", value: "Limited Liability Company (LLC)"},
    {name: "S-Corp", value: "S-Corp"},
    {name: "C-Corp", value: "C-Corp"},
    {name: "Company Limited by Shares", value: "Company Limited by Shares"},
    {name: "Company Unlimited by Shares", value: "Company Unlimited by Shares"},
    {name: "Company Limited by Guarantee", value: "Company Limited by Guarantee"},
    {name: "Incorporated Partnership", value: "Incorporated Partnership"},
  ]
  stagesOptions: Array<{name: string, value: string}> = [
    {name: "Idea Stage", value: "Idea Stage"},
    {name: "Minimum Viable Product (MVP)", value: "Minimum Viable Product (MVP)"},
    {name: "Pre Seed(Pre Revenue)", value: "Pre Seed(Pre Revenue)"},
    {name: "Pre Seed(Pre Revenue with Traction)", value: "Pre Seed(Pre Revenue with Traction)"},
    {name: "Early Stage", value: "Early Stage"},
    {name: "Seed Stage", value: "Seed Stage"},
    {name: "Series A+", value: "Series A+"},
  ]
  getCountries: ICountry[] = Country.getAllCountries();
  getAllStates: any
  countries:Array<{name: string, value: string}> = this.getCountries.map(country => ({ name: country.name, value: country.name }));
  states: any
  cities: any
  findCountry: any
  loadingPage: boolean = false
  isLoading: boolean = false;
  @Output() next = new EventEmitter<any>()

  constructor(private pitchService: PitchSubmissionService,
              private toast: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private appender: FormDataAppender) {
  }

  ngOnInit() {
    this.getPitch()

    this.startupProfileForm.controls.location.controls.country.valueChanges.subscribe(value => {
      this.setStates(value)
    })

    this.startupProfileForm.controls.location.controls.region.valueChanges.subscribe(value => {
      this.setCities(value)
    })
  }

  setCities(value: any) {
    const findState = this.getAllStates.find((state: { name: null; }) => state.name === value)
    const getAllCities = City.getCitiesOfState(this.findCountry?.isoCode, findState?.isoCode)
    this.cities = getAllCities.map(city => ({name: city.name, value: city.name}))
  }

  setStates(value: any) {
    this.findCountry = this.getCountries.find(country => country.name === value)
    this.getAllStates = State.getStatesOfCountry(this.findCountry?.isoCode)
    this.states = this.getAllStates.map(((state: { name: any; }) => ({name:state.name, value: state.name})))
  }
  getAllIndustries() {
    this.loadingIndustries = true;
    this.pitchService.getIndustries().subscribe({
      next: value => {
       value.data.map((industry: {name: string}) => {
         this.industries.push({name: industry.name, value: industry.name})
       })
        this.loadingIndustries = false;
      },
      error: error => {
        this.loadingIndustries = false;
        this.toast.error(error.error.message || "Oops! Server error")
      }
    })
  }

  getPitch() {
    if(this.pitchService.pitchData) {
      this.getAllIndustries()
      const pitch: startupData = this.pitchService.pitchData
      this.startupProfileForm.get('startupName')?.setValue(pitch.startup_name)
      this.startupProfileForm.get('registrationInfo')?.setValue(pitch.registration_type)
      console.log(pitch.registration_type)
      this.startupProfileForm.get('registrationCountry')?.setValue(pitch.registration_country)
      this.startupProfileForm.get('industry')?.setValue(pitch.industry)
      this.startupProfileForm.get('stage')?.setValue(pitch.stage)
      this.startupProfileForm.controls.location.get('country')?.setValue(pitch.country)
      this.setStates(pitch.country)
      this.startupProfileForm.controls.location.get('region')?.setValue(pitch.region_state)
      this.setCities(pitch.region_state)
      this.startupProfileForm.controls.location.get('city')?.setValue(pitch.city)
      this.startupProfileForm.controls.social.get('website')?.setValue(pitch.website)
      this.startupProfileForm.controls.social.get('linkedIn')?.setValue(pitch.linkedin)
      if(this.startupProfileForm.invalid) {
        localStorage.removeItem('pitch');
        this.getPitch()
      }
    } else {
      this.loadingPage = true
      this.pitchService.getPitch().subscribe({
        next: value => {
          localStorage.setItem('pitch', JSON.stringify(value.data))
          this.getAllIndustries()
          this.startupProfileForm.get('startupName')?.setValue(value.data.startup_name)
          this.startupProfileForm.get('registrationInfo')?.setValue(value.data.registration_type)
          this.startupProfileForm.get('registrationCountry')?.setValue(value.data.registration_country)
          this.startupProfileForm.get('industry')?.setValue(value.data.industry)
          this.startupProfileForm.get('stage')?.setValue(value.data.stage)
          this.startupProfileForm.controls.location.get('country')?.setValue(value.data.country)
          this.startupProfileForm.controls.location.get('city')?.setValue(value.data.city)
          this.startupProfileForm.controls.location.get('region')?.setValue(value.data.region_state)
          this.startupProfileForm.controls.social.get('website')?.setValue(value.data.website)
          this.startupProfileForm.controls.social.get('linkedIn')?.setValue(value.data.linkedin)
          this.loadingPage =false
        },
        error: error => {
          this.loadingPage =false
          this.toast.error(error.error.message || "Oops! Server error")
        }
      })
    }
  }

  startupProfileForm = new FormGroup({
    startupName: new FormControl('', Validators.required),
    registrationInfo: new FormControl(null),
    industry: new FormControl(null, Validators.required),
    registrationCountry: new FormControl(null),
    stage: new FormControl(null, Validators.required),
    location: new FormGroup({
      country: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      region: new FormControl(null, Validators.required),
    }),
    social: new FormGroup({
      website: new FormControl(''),
      linkedIn: new FormControl('')
    })
  });

  // startupProfileForm = this.fb.group({
  //   startupName: ['', [Validators.required]],
  //   registrationInfo: [null],
  //   industry: [null, Validators.required],
  //   registrationCountry: [null],
  //   stage: [null, Validators.required],
  //   location: this.fb.group({
  //     country: [null, Validators.required],
  //     city: [null, Validators.required],
  //     region: [null, Validators.required],
  //   }),
  //   social: this.fb.nonNullable.group({
  //     website: ['',],
  //     linkedIn: ['']
  //   })
  // })

  onSubmit = () => {
    this.isLoading = true
    if(this.startupProfileForm.valid) {
      this.pitchService.submitStartupProfile(this.startupProfileForm.value).subscribe({
        next: value => {
          this.toast.success(value.message)
          this.router.navigateByUrl('/pitch-submission/pitch-details').then(r => r)
          this.isLoading = false
        },
        error: (err) => {
          this.toast.error(err.error.error || 'Oops! Something went wrong')
          this.isLoading = false
        }
      })
      this.appender.appendFormData(this.startupProfileForm)
      // this.pitchService.saveStartupProfile(this.startupProfileForm.value)

    }
  }

}
