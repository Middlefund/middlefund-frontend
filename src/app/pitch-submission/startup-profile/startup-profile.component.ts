import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PitchSubmissionService} from "../pitch-submission.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {City, Country, ICountry, State} from "country-state-city";
import {Router} from "@angular/router";
import {startupData} from "../../models/interfaces";
import {registrationInfo, stagesOptions} from "../../utility/constants";

@Component({
  selector: 'app-startup-profile',
  templateUrl: './startup-profile.component.html',
  styleUrls: ['./startup-profile.component.css']
})
export class StartupProfileComponent implements OnInit{
  industries: Array<{name: string, value: string}> = []
  loadingIndustries: boolean = false
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
              private router: Router) {
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

  setData(data: startupData) {
    this.startupProfileForm.get('startupName')?.setValue(data.startup_name)
    this.startupProfileForm.get('registrationInfo')?.setValue(data.registration_type)
    this.startupProfileForm.get('registrationCountry')?.setValue(data.registration_country)
    this.startupProfileForm.get('industry')?.setValue(data.industry)
    this.startupProfileForm.get('stage')?.setValue(data.stage)
    this.startupProfileForm.controls.location.get('country')?.setValue(data.country)
    this.setStates(data.country)
    this.startupProfileForm.controls.location.get('region')?.setValue(data.region_state)
    this.setCities(data.region_state)
    this.startupProfileForm.controls.location.get('city')?.setValue(data.city)
    this.startupProfileForm.controls.social.get('website')?.setValue(data.website)
    this.startupProfileForm.controls.social.get('linkedIn')?.setValue(data.linkedin)
  }
  getPitch() {
    if(this.pitchService.pitchData) {
      this.getAllIndustries()
      const pitch: startupData = this.pitchService.pitchData
      this.setData(pitch)
      // if(this.startupProfileForm.invalid) {
      //   localStorage.removeItem('pitch');
      //   // this.getPitch()
      // }
    } else {
      this.loadingPage = true
      this.pitchService.getPitch().subscribe({
        next: value => {
          localStorage.setItem('pitch', JSON.stringify(value.data))
          this.pitchService.updatePitch(value.data)
          // this.getAllIndustries()
          this.setData(value.data)
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


  onSubmit = () => {
    if(this.startupProfileForm.valid) {
      if(JSON.stringify(this.pitchService.startupProfile) === JSON.stringify(this.startupProfileForm.value)) {
        this.router.navigateByUrl('/pitch-submission/pitch-details').then(r => r)
      }
      else {
        this.isLoading = true
        this.pitchService.submitStartupProfile(this.startupProfileForm.value).subscribe({
          next: value => {
            localStorage.setItem('pitch', JSON.stringify(value.data))
            this.pitchService.updatePitch(value.data)
            this.toast.success(value.message)
            this.router.navigateByUrl('/pitch-submission/pitch-details').then(r => r)
            this.isLoading = false
          },
          error: (err) => {
            this.toast.error(err.error.error || 'Oops! Something went wrong')
            this.isLoading = false
          }
        })
      }

    }
  }

  protected readonly registrationInfo = registrationInfo;
  protected readonly stagesOptions = stagesOptions;
}
