import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { HomeService } from '../home.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  mailInput!: FormGroup
  isLoading = false


  constructor(private toast: ToastrService,
              private homeService:HomeService,
              private http:HttpClient
    ){}

  ngOnInit(): void {
    this.mailInput = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      
    })
  }
  

  onSubscribe(  ){
    this.homeService.subscribeEmail(this.mailInput.value)
    .subscribe({
      next: val => {
             this.toast.success(val.message)       
      },
      error: err => {
            this.toast.error(err.error.message)
      }  
    })
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false
    }, 3000)
  }
}
