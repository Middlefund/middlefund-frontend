import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {SelectItemGroup} from "primeng/api";

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-investor-settings',
  templateUrl: './investor-settings.component.html',
  styleUrls: ['./investor-settings.component.css']
})
export class InvestorSettingsComponent {
  isLoading: boolean = false;
  groupedCities!: SelectItemGroup[];

  selectedCities!: City[];
  constructor(private fb: FormBuilder) {
    this.groupedCities = [
      {
        label: 'Germany',
        value: 'de',
        items: [
          { label: 'Berlin', value: 'Berlin' },
          { label: 'Frankfurt', value: 'Frankfurt' },
          { label: 'Hamburg', value: 'Hamburg' },
          { label: 'Munich', value: 'Munich' }
        ]
      },
      {
        label: 'USA',
        value: 'us',
        items: [
          { label: 'Chicago', value: 'Chicago' },
          { label: 'Los Angeles', value: 'Los Angeles' },
          { label: 'New York', value: 'New York' },
          { label: 'San Francisco', value: 'San Francisco' }
        ]
      },
      {
        label: 'Japan',
        value: 'jp',
        items: [
          { label: 'Kyoto', value: 'Kyoto' },
          { label: 'Osaka', value: 'Osaka' },
          { label: 'Tokyo', value: 'Tokyo' },
          { label: 'Yokohama', value: 'Yokohama' }
        ]
      }
    ];
  }

  investorForm = this.fb.group({
    organizationName: [''],
    investmentStage: [''],
    position: [''],
    interests: [''],
    commitment: [''],
    minChequeSize: [''],
    maxChequeSize: [''],
    linkedIn: [''],
    twitter: [''],
  })

  onSubmit() {

  }
}
