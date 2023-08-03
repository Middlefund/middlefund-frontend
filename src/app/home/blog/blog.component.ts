import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  userMail = new FormControl('',Validators.email)

  constructor(private toast: ToastrService){}

  ngOnInit(): void {
    
      
  }

  onSubscribe(){
    this.toast.success('Subscribed')
    console.log(this.userMail.value)
    
   
    //trigger toast
  }

}
