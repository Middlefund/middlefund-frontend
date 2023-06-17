import {Component, OnInit} from '@angular/core';
import {AccountsService} from "../../accounts/accounts.service";
import {ProfileInitials} from "../../utility/profileInitials";

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit{
  image: string = ''

  constructor(private accountsService: AccountsService,
              private profileInitials: ProfileInitials) {
  }
  ngOnInit() {
    const user = this.accountsService.userData
    this.image = this.image = user.avatar ? user.avatar : this.profileInitials.createImageFromInitials()
  }

}
