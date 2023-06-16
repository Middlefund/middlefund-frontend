import {Component, EventEmitter, Input, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

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
export class NotificationsPanelComponent {
  @Input() slideIn: any;
  notificationType: string = 'user';
  @Input() isNotificationsPanelOpen: boolean = false;
  @Output() openNotificationsPanel = new EventEmitter();

  toggleNotifications() {
    this.isNotificationsPanelOpen =!this.isNotificationsPanelOpen;
  }
  toggleNotificationType(type: string) {
    this.notificationType = type;
  }
}
