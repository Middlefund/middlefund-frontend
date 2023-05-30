import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() for:string = '';
  @Input() label:string = '';
  @Input() type: string = '';
  @Input() placeholder: string = '';
}
