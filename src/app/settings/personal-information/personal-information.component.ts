import {Component, OnInit} from '@angular/core';
import {AccountsService} from "../../accounts/accounts.service";
import {ProfileInitials} from "../../utility/profileInitials";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit{
  image: string = ''
  formData: FormData = new FormData()

  constructor(private accountsService: AccountsService,
              private profileInitials: ProfileInitials,
              private fb: FormBuilder) {
  }
  ngOnInit() {
    const user = this.accountsService.userData
    this.image = this.image = user.avatar ? user.avatar : this.profileInitials.createImageFromInitials()
  }

  setData() {

  }

  personalInformationForm = this.fb.group({
    fullName: ['', Validators.required],
    image: ['', Validators.required]
  })

  onSubmit() {

  }


}
