import {Component, OnInit} from '@angular/core';
import {AccountsService} from "../../accounts/accounts.service";

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit{
  title: string = 'Welcome to Startup Dashboard';
  flipCardData: Array<{title: string, description: string, image: string, route: string}> = [];
   flashCardData: Array<{title: string, value: string}> = []

  constructor(private accountsService: AccountsService) {
  }

  ngOnInit(): void {
     if(this.accountsService.userData.user_type === "startup") {
       this.flipCardData = [
         {title: 'Submit Pitch',
           description: 'Tell us about your startup and how much you are looking to raise.',
           image: 'assets/undraw_pitching_re_fpgk.svg', route: ''},
         {title: 'Middlefund Platinum', description: 'This page is currently under construction',
           image: 'assets/undraw_revenue_re_2bmg.svg', route: '/under-construction'},
         {title: 'Build Pitch', description: 'This page is currently under construction',
           image: 'assets/undraw_building_blocks_re_5ahy.svg', route: '/under-construction'}
       ]

       this.flashCardData= [
         {title: 'Amount raised', value: '$30,000'},
         {title: 'Number of pitches', value: '1',},
         {title: 'Times pitch viewed', value: '8'},
         {title: 'Intended raise', value: '$60,0000'}
       ]
     }


  }



}
