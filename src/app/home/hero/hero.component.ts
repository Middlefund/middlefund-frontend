import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import {fadeIn} from "ng-animate";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))])
  ]
})
export class HeroComponent {
  fadeInIn: any;
}
