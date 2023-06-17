import { Component } from '@angular/core';

@Component({
  selector: 'app-investor-dashboard',
  templateUrl: './investor-dashboard.component.html',
  styleUrls: ['./investor-dashboard.component.css']
})
export class InvestorDashboardComponent {
  isProfileMenuOpen = false;
  slideIn: any = false
  isNotificationsPanelOpen = false
  navigationData = [
    {title: 'Dashboard', icon: 'home', route: '/investor/home'},
    {title: 'View Startups', icon: 'leaderboard', route: '/investor/view-'},
    {title: 'Settings', icon: 'settings', route: '/startup/settings'}
  ]

  openNotificationsPanel() {
    this.slideIn = !this.slideIn
    this.isNotificationsPanelOpen = !this.isNotificationsPanelOpen;
  }
}
