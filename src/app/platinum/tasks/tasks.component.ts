import {Component, OnInit} from '@angular/core';
import {AccountsService} from "../../accounts/accounts.service";
import {ProfileInitials} from "../../utility/profileInitials";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  isOpen = true;
  name: string = ''
  image: string = ''

  constructor(private accountsService: AccountsService,
              private profileInitials: ProfileInitials,) {
  }
  ngOnInit() {
    this.accountsService.user.subscribe(value => {
      this.image = value.user.avatar ? value.user.avatar : this.profileInitials.createImageFromInitials()
      this.name = value.user.name
    })
  }

  formatDate(date: Date = new Date()): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayOfWeek}\n${day}${day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'} ${month}, ${year}`;
  }

}
