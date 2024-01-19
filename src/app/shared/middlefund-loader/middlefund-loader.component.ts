import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-middlefund-loader',
  templateUrl: './middlefund-loader.component.html',
  styleUrls: ['./middlefund-loader.component.css'],
})
export class MiddlefundLoaderComponent {
  @Input({ required: true })
  isLoading: boolean = false;
}
