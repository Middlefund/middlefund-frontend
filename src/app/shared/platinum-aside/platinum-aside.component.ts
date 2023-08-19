import {Component, Input, OnInit} from '@angular/core';
import {AccountsService} from "../../accounts/accounts.service";
import {ProfileInitials} from "../../utility/profileInitials";

@Component({
  selector: 'app-platinum-aside',
  templateUrl: './platinum-aside.component.html',
  styleUrls: ['./platinum-aside.component.css']
})
export class PlatinumAsideComponent implements OnInit{
  name: string = ''
  image: string = ''
  navigationData: Array<{ route: string, icon: string, title: string }> = [
    {route: 'tasks', icon: 'format_list_numbered', title: 'Tasks'},
    {route: 'team', icon: 'groups', title: 'Team'},
  ]
  constructor(private accountsService: AccountsService,
              private profileInitials: ProfileInitials,) {
  }
  ngOnInit() {
    this.accountsService.user.subscribe(value => {
      this.image = value.user.avatar ? value.user.avatar : this.profileInitials.createImageFromInitials()
      this.name = value.user.name
    })
  }
}
