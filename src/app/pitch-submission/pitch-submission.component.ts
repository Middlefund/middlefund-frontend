import { Component } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-pitch-submission',
  templateUrl: './pitch-submission.component.html',
  styleUrls: ['./pitch-submission.component.css']
})
export class PitchSubmissionComponent {
  slideIn: any = false
  isNotificationsPanelOpen = false
  activeForm = 1
  isStartupProfileValid = false

  constructor(private toast: ToastrService) {
  }

  openNotificationsPanel() {
    this.slideIn = !this.slideIn
    this.isNotificationsPanelOpen = !this.isNotificationsPanelOpen;
  }
}
