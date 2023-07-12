import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {startupData} from "../models/interfaces";
import {PitchSubmissionService} from "./pitch-submission.service";

@Component({
  selector: 'app-pitch-submission',
  templateUrl: './pitch-submission.component.html',
  styleUrls: ['./pitch-submission.component.css']
})
export class PitchSubmissionComponent implements OnInit{
  slideIn: any = false
  isNotificationsPanelOpen = false
  activeForm = 1
  isStartupProfileValid = false
  status: string = ''
  isLoading: boolean = false
  breadcrumb: Array<{name: string, link: string}> = [{name: 'dashboard', link: '/startup'}, {name: 'pitch-submission', link: '/pitch-submission'}]

  constructor(private toast: ToastrService,
              private pitchService: PitchSubmissionService) {
  }

  ngOnInit() {
    this.getPitch()
  }

  openNotificationsPanel() {
    this.slideIn = !this.slideIn
    this.isNotificationsPanelOpen = !this.isNotificationsPanelOpen;
  }

  getPitch() {
      this.isLoading = true
      this.pitchService.getPitch().subscribe({
        next: value => {
          localStorage.setItem('pitch', JSON.stringify(value.data))
          this.pitchService.updatePitch(value.data)
          this.status = this.pitchService.pitchData.verified
          this.isLoading = false
        },
        error: error => {
          this.isLoading = false
          this.toast.error(error.error.message || "Oops! Server error")
        }
      })
  }
}
