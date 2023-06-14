import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-flip-box',
  templateUrl: './flip-box.component.html',
  styleUrls: ['./flip-box.component.css']
})
export class FlipBoxComponent {
  @Input() title: string = ''
  @Input() description: string = ''
  @Input() imageSrc: string = ''
  @Input() route: string = '';

}
