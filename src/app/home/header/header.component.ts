import {Component, OnInit} from '@angular/core';
import {trigger, transition, useAnimation} from "@angular/animations";
import {slideInLeft} from "ng-animate";
import {AccountsService} from "../../accounts/accounts.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('slideIn', [transition('* => *', useAnimation(slideInLeft))])
  ]
})

export class HeaderComponent implements OnInit{
  slideIn: any;
  isNavBarOpen = false;
  isLoggedIn = false;

  constructor(private accountsService: AccountsService) {
  }

  ngOnInit() {
    if(this.accountsService.loggedInUser) {
      this.isLoggedIn = true;
    }
  }

  toggleNavBar() {
    this.isNavBarOpen = !this.isNavBarOpen;
  }
}
