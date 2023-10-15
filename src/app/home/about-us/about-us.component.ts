import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  options: AnimationOptions = {
    path: '../../../../assets/lottie/editedOfficeGirl.json',
  }
  options1: AnimationOptions = {
    path: '../../../../assets/lottie/santanaCopy.json',
  }
  examsBoyImage: AnimationOptions = {
    path: '../../../../assets/lottie/schoolBoy.json'
  }

  dataVisualisation: AnimationOptions = {
    path: '../../../../assets/lottie/dataVisualization.json'
  }
}
