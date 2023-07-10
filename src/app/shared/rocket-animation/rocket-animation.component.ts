import {Component, Input} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";

@Component({
  selector: 'app-rocket-animation',
  templateUrl: './rocket-animation.component.html',
  styleUrls: ['./rocket-animation.component.css']
})
export class RocketAnimationComponent {
  @Input() title: string = ''
  options: AnimationOptions = {
    path:"../../../assets/lottie/rocket-lottie.json"
  }
}
