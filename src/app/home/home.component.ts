import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
@HostListener("window:scroll", [])
onScroll():void{
  if( window.innerHeight  >= document.body.offsetHeight - 1){
    console.log('hey')
  }
}
  

  constructor(){}

  ngOnInit(): void {
}

}
