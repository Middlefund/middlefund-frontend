import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-incorporation',
  templateUrl: './company-incorporation.component.html',
  styleUrls: ['./company-incorporation.component.css'],
})
export class CompanyIncorporationComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    console.log(this.activatedRoute.snapshot.queryParamMap.get('id'));
  }
}
