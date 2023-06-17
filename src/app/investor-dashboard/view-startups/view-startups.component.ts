import { Component } from '@angular/core';

// interface PageEvent {
//   first: number;
//   rows: number;
//   page: number;
//   pageCount: number;
// }

@Component({
  selector: 'app-view-startups',
  templateUrl: './view-startups.component.html',
  styleUrls: ['./view-startups.component.css']
})
export class ViewStartupsComponent {
  first: number = 0;

  rows: number = 10;

  filter: boolean = false

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  openFilter() {
    this.filter = !this.filter;
  }

}
