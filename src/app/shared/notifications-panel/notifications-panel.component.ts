import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AccountsService} from "../../accounts/accounts.service";
import {ToastrService} from "ngx-toastr";
import {NotificationData} from "../../models/interfaces";

@Component({
  selector: 'app-notifications-panel',
  templateUrl: './notifications-panel.component.html',
  styleUrls: ['./notifications-panel.component.css'],
  animations: [
    trigger('slideIn', [
      state('in', style({ transform: 'translateX(-100%)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(1000)
      ]),
      transition('* => void', [
        animate(1000, style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class NotificationsPanelComponent implements OnInit{
  @Input() slideIn: any;
  notificationType: string = 'user';
  @Input() isNotificationsPanelOpen: boolean = false;
  @Output() openNotificationsPanel = new EventEmitter();
  userNotifications: Array<NotificationData> = [];
  systemNotifications: Array<NotificationData> = [];
  isLoading: boolean = false;

  constructor(private accounts: AccountsService,
              private toast: ToastrService) {
  }

  ngOnInit() {
    this.getNotifications()
  }

  toggleNotifications() {
    this.isNotificationsPanelOpen =!this.isNotificationsPanelOpen;
  }
  toggleNotificationType(type: string) {
    this.notificationType = type;
  }

  getNotifications() {
    this.isLoading = true;
    this.accounts.notifications().subscribe({
      next: value => {
        value.data.map((notification: NotificationData) => {
            if(notification.data.type === 'user') {
              this.userNotifications.push(notification)
            }
            else {
              this.systemNotifications.push(notification)
            }
        })
        this.isLoading = false
      },
      error: err => {
        this.toast.error(err.error.error || 'Server error')
        this.isLoading = false
      }
    })
  }

  getTimeElapsed(created_at: string): string {
    const createdAtDate = new Date(created_at);
    const now = new Date();

    const elapsedMilliseconds = now.getTime() - createdAtDate.getTime();
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

    if (elapsedSeconds < 60) {
      return `${elapsedSeconds} seconds ago`;
    }

    const elapsedMinutes = Math.floor(elapsedSeconds / 60);

    if (elapsedMinutes < 60) {
      return `${elapsedMinutes} minutes ago`;
    }

    const elapsedHours = Math.floor(elapsedMinutes / 60);

    if (elapsedHours < 24) {
      return `${elapsedHours} hours ago`;
    }

    const elapsedDays = Math.floor(elapsedHours / 24);

    return `${elapsedDays} days ago`;
  }

}
