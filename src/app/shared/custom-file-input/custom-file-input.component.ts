import {Component, Input} from '@angular/core';
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

}
