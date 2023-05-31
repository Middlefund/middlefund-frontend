import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() isLoading!: boolean;
  @Input() name: string = ''
  @Input() variant: 'primary' |
    'secondary' | 'tertiary' | 'optional' = 'primary'
  @Input() type!: 'button' | 'submit'
}
