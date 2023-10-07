import { Component } from '@angular/core';
import {animate, keyframes, style, transition, trigger, useAnimation} from "@angular/animations";
import {fadeIn, zoomIn, zoomInUp} from "ng-animate";

@Component({
  selector: 'app-hero-video',
  templateUrl: './hero-video.component.html',
  styleUrls: ['./hero-video.component.css'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))]),
    trigger('zoomIn', [transition('* => *', [
      // Add a delay of 500 milliseconds (adjust the value as needed)
      style({ opacity: 0, transform: 'scale(0.5)' }),
      animate('10s ease-in', style({ opacity: 1, transform: 'scale(1)' }))
    ])]),
    trigger('imageAppear', [
      transition('* => *', [
        animate('1s', keyframes([
          style({ opacity: 0, transform: 'translateY(50%)', offset: 0 }), // Start from behind and lower
          style({ opacity: 0.5, transform: 'translateY(25%)', offset: 0.5 }), // Move up slightly
          style({ opacity: 1, transform: 'translateY(0%)', offset: 1 }), // Fully visible at the top
        ]))
      ])
    ])
  ]
})
export class HeroVideoComponent {

  protected readonly fadeIn = fadeIn;
  protected readonly zoomIn = zoomIn;
  protected readonly zoomInUp = zoomInUp;
}
