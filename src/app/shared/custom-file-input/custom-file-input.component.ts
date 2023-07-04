import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-custom-file-input',
  templateUrl: './custom-file-input.component.html',
  styleUrls: ['./custom-file-input.component.css']
})
export class CustomFileInputComponent {
  @Input() title: string = ''
  @Input() description: string = ''
  @Input() acceptedType: string = '';
  @Input() accept: string = ''
  @Input() control = new FormControl
  @Output() changeInput = new EventEmitter
  @Input() for = ''

  onChange(event: any): void {
    this.changeInput.emit(event)
  }
}
