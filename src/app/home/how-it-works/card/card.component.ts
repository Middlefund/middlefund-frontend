import {Component, Input} from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import {bounce, slideInRight} from "ng-animate";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce))])
  ]
})
export class CardComponent {
  @Input() step!: string;
  @Input() detail!: string;
  bounce: any;
}
