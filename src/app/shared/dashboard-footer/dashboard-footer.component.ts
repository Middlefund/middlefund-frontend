import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-footer',
  templateUrl: './dashboard-footer.component.html',
  styleUrls: ['./dashboard-footer.component.css']
})
export class DashboardFooterComponent {

  getYear() {
    const date = new Date()
    return date.getFullYear()
  }
}
