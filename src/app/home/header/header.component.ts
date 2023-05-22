import { Component } from '@angular/core';
import {trigger, transition, useAnimation} from "@angular/animations";
import {slideInLeft} from "ng-animate";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('slideIn', [transition('* => *', useAnimation(slideInLeft))])
  ]
})

export class HeaderComponent {
  slideIn: any;
  isNavBarOpen = false;

  toggleNavBar() {
    this.isNavBarOpen = !this.isNavBarOpen;
  }
}
