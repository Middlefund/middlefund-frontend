import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dashboard-aside',
  templateUrl: './dashboard-aside.component.html',
  styleUrls: ['./dashboard-aside.component.css']
})
export class DashboardAsideComponent {
  @Input() navigationData: Array<{ route: string, icon: string, title: string }> = []
}
