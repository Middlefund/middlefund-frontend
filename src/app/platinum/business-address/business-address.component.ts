import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-address',
  templateUrl: './business-address.component.html',
  styleUrls: ['./business-address.component.css']
})
export class BusinessAddressComponent implements OnInit {

 

  constructor(private fb: FormBuilder, private router:Router){}

  ngOnInit(): void {
      
  }

  businessAddress = this.fb.group({
    digitalAddress : ['', Validators.required],
    houseNo :['', Validators.required] ,
    landmark: [''],
    city:[''],
    district:[''],
    region:[''],
    poBox:['']

  })

  onSubmitBusinessAddress(){
    this.router.navigate(['/platinum/proprietor-details'])
console.log(this.businessAddress.value)
  }

}
