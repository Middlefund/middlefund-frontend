import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  userMail = new FormControl('',Validators.email)

  constructor(private toast: ToastrService,
              private homeService:HomeService,
              private http:HttpClient
    ){}

  ngOnInit(): void {
    
      
  }

  onSubscribe(){

    this.http.post(`${environment.BACKEND_URL}/api/newsletter-subscription`, this.userMail.value)
    .subscribe((res) =>{
      console.log(res)
    })
    // this.homeService.subscription(this.userMail.value).subscribe({
    //   next: value =>{
    //     this.toast.success('Subscribed')
    //   }
    // })
    
    console.log(this.userMail.value)
    
   
    //trigger toast
  }

}
