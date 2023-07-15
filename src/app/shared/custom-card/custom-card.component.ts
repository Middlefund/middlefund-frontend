import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.css']
})
export class CustomCardComponent {
  @Input() name: string = ''
  @Input() bio: string = ''
  @Input() category: string = ''
  @Input() status: string = ''
  @Input() id: string = ''
  @Input() logoSrc: string = ''
}
