import { Component } from '@angular/core';

@Component({
  selector: 'app-pitch-submission',
  templateUrl: './pitch-submission.component.html',
  styleUrls: ['./pitch-submission.component.css']
})
export class PitchSubmissionComponent {
  slideIn: any = false
  isNotificationsPanelOpen = false

  openNotificationsPanel() {
    this.slideIn = !this.slideIn
    this.isNotificationsPanelOpen = !this.isNotificationsPanelOpen;
  }
}
