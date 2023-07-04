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

  onNext() {
    this.activeForm++
  }

  startupProfileValidity($event: any) {
    this.isStartupProfileValid = $event
  }

  loadPitchDetailsForm() {
    return this.isStartupProfileValid ?
      this.activeForm = 2 :
      this.toast.warning('You have to fill the other parts of the form first')
  }

  onPrevious() {
    this.activeForm--
  }
}
