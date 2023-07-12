import { Component } from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.css']
})
export class UnderConstructionComponent {

  constructor(private location: Location) {
  }
  goBack(): void {
    this.location.back();
  }
}
