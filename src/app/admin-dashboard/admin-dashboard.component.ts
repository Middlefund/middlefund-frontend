import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  isProfileMenuOpen = false;
  slideIn: any = false
  isNotificationsPanelOpen = false
  navigationData = [
    {title: 'Dashboard', icon: 'home', route: '/admin/home'},
    {title: 'Manage Investors', icon: 'payments', route: '/admin/manage-investors'},
    {title: 'Manage Startups', icon: 'flag', route: '/admin/manage-startups'},
    {title: 'Settings', icon: 'settings', route: '/admin/settings'},
  ]

  openNotificationsPanel() {
    this.slideIn = !this.slideIn
    this.isNotificationsPanelOpen = !this.isNotificationsPanelOpen;
  }
}
