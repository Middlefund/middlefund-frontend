import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CurrencyPipe, PercentPipe} from "@angular/common";

@Component({
  selector: 'app-representative-details',
  templateUrl: './representative-details.component.html',
  styleUrls: ['./representative-details.component.css']
})
export class RepresentativeDetailsComponent {

  constructor(private fb: FormBuilder){
  }

  pitchDetailsForm = this.fb.group({
    repName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+(?:\\s+[A-Za-z]+)*$\n')]],
    position: ['', Validators.required, Validators.pattern('^[A-Za-z]+$\n')],
    linkedIn: [''],
    repBio: ['', Validators.required]

  })
  onSubmit() {

  }
}
