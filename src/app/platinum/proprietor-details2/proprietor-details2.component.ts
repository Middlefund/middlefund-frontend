import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-proprietor-details2',
  templateUrl: './proprietor-details2.component.html',
  styleUrls: ['./proprietor-details2.component.css']
})
export class ProprietorDetails2Component implements OnInit{

  constructor(private fb:FormBuilder, private location: Location){}

  ngOnInit(): void {
      
  }

  proprietorDetails2 = this.fb.group({
    place: [''],
    phone:[''],
    email:[''],


  }
)
  goBack(){
    this.location.back()
  }
  onSubmitProprietorDetails2(){

  }

}
