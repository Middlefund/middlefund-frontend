import {Component, OnInit} from '@angular/core';
import {AccountsService} from "../../accounts/accounts.service";

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit{
  title: string = ''
  flipCardData: Array<{title: string, description: string, image: string, route: string}> = [];
   flashCardData: Array<{title: string, value: string, icon: string}> = []

  constructor(private accountsService: AccountsService) {
  }

  ngOnInit(): void {
     if(this.accountsService.userData.user_type === "startup") {
       this.title = 'Welcome to Startup Dashboard';
       this.flipCardData = [
         {title: 'Submit Pitch',
           description: 'Tell us about your startup and how much you are looking to raise.',
           image: 'assets/undraw_pitching_re_fpgk.svg', route: '../../pitch-submission'},
         {title: 'Middlefund Platinum', description: 'This page is currently under construction',
           image: 'assets/undraw_revenue_re_2bmg.svg', route: '/platinum'},
         {title: 'Build Pitch', description: 'This page is currently under construction',
           image: 'assets/undraw_building_blocks_re_5ahy.svg', route: '/under-construction'}
       ]

       this.flashCardData= [
         {title: 'Amount raised', value: '$30,000', icon: ''},
         {title: 'Number of pitches', value: '1', icon: ''},
         {title: 'Times pitch viewed', value: '8', icon: ''},
         {title: 'Intended raise', value: '$60,0000', icon: ''}
       ]
     }
     else if(this.accountsService.userData.user_type === "investor")  {
       this.title = 'Welcome to Investor Dashboard';

       this.flashCardData= [
         {title: 'Favorite', value: 'Agriculture', icon: ''},
         {title: 'Number of pitches view', value: '1', icon: ''},
         {title: 'Number of investments', value: '4', icon: ''},
         {title: 'Maximum capacity', value: '$60,0000', icon: ''}
       ]

       this.flipCardData = [
         {title: 'View Startup Listings',
           description: 'View a list of amazing startups with unimaginable potential.',
           image: 'assets/undraw_empty_cart_co35.svg', route: '../view-startups'},
         {title: 'Investment Portfolio', description: 'This page is currently under construction',
           image: 'assets/undraw_invest_re_8jl5.svg', route: '/under-construction'},
         {title: 'Middlefund Platinum', description: 'This page is currently under construction',
           image: 'assets/undraw_building_blocks_re_5ahy.svg', route: '/platinum'}
       ]
     }
     else if(this.accountsService.userData.user_type === "admin") {
       this.title = 'Hi Admin';

       this.flashCardData= [
         {title: 'Number of investors', value: '34', icon: 'money'},
         {title: 'Number of startups', value: '1', icon: 'flag'},
         {title: 'Verified Pitches', value: '4', icon: 'beenhere'},
         {title: 'Total Users', value: '1000', icon: 'groups'}
       ]

       // this.flipCardData = [
       //   {title: 'Manage ',
       //     description: 'View a list of amazing startups with unimaginable potential.',
       //     image: 'assets/undraw_empty_cart_co35.svg', route: '../view-startups'},
       //   {title: 'Investment Portfolio', description: 'This page is currently under construction',
       //     image: 'assets/undraw_invest_re_8jl5.svg', route: '/under-construction'},
       //   {title: 'Middlefund Platinum', description: 'This page is currently under construction',
       //     image: 'assets/undraw_building_blocks_re_5ahy.svg', route: '/under-construction'}
       // ]
     }


  }



}
