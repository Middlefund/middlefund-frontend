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
    'secondary' | 'tertiary' | 'optional' | 'custom' = 'primary'
  @Input() type!: 'button' | 'submit'
  @Input() disable!: boolean
  @Input() icon: string = ''
}
