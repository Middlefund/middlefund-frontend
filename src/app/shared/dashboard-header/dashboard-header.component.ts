import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent {
  @Input() navigationData: Array<{ route: string, icon: string, title: string }> = []
  @Output() notificationButton: EventEmitter<any> = new EventEmitter
  isMobileMainMenuOpen: boolean = false
  isMobileSubMenuOpen: boolean = false
  emitNotificationButton() {
    this.notificationButton.emit()
  }

  openMobileSubMenu() {
    this.isMobileSubMenuOpen = !this.isMobileSubMenuOpen;
  }

  openMobileMainMenu() {
    this.isMobileMainMenuOpen = !this.isMobileMainMenuOpen
  }
}
