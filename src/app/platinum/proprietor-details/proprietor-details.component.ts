import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Options } from 'autoprefixer';

@Component({
  selector: 'app-proprietor-details',
  templateUrl: './proprietor-details.component.html',
  styleUrls: ['./proprietor-details.component.css']
})
export class ProprietorDetailsComponent implements OnInit {
  gender: Array<{name:string, value:string}> = [
     {name:'Male', value:'male'},
     {name:'Female', value:'female'},
     {name:'Other', value:'other'}
    ]
    answer: Array<{name:string, value:string}> = [
      {name:'Yes', value:'yes'},
      {name:'No', value:'no'}
     ]
  constructor(private fb: FormBuilder, private router: Router){}

  ngOnInit(): void {
      
  }

  proprietorDetails = this.fb.group({
    name : ['', Validators.required],
    gender :['', Validators.required] ,
    dob: [''],
    nationality:[''],
    tin:[''],
    tinInfo:['']
  
  })

  onSubmitProprietorDetails(){
    this.router.navigate(['/platinum/proprietor-details-2'])
console.log(this.proprietorDetails.value)
  }


}
