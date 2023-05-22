import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import {slideInRight} from "ng-animate";

@Component({
  selector: 'app-investor-hero',
  templateUrl: './investor-hero.component.html',
  styleUrls: ['./investor-hero.component.css'],
  animations: [
    trigger('slideIn', [transition('* => *', useAnimation(slideInRight))])
  ]
})
export class InvestorHeroComponent {
  slideIn: any;
}
