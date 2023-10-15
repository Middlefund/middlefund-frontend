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

    const smoothScrollLinks = document.querySelectorAll("a");

    smoothScrollLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href")?.substring(1) ?? "";

        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  toggleNavBar() {
    this.isNavBarOpen = !this.isNavBarOpen;
  }
}
