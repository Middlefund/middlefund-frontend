import {ChangeDetectorRef, Component, ElementRef, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  textIndex: number = 0
  text: string = 'All In One Platform For Startups.'

  constructor(private el: ElementRef,
              private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.typing()
  }

  @HostListener("window:scroll", [])
  onScroll():void{
    if( window.innerHeight  >= document.body.offsetHeight - 1){
      console.log('hey')
    }
  }

  typing() {
    if (this.textIndex < this.text.length) {
      this.el.nativeElement.querySelector('#text').textContent += this.text.charAt(
        this.textIndex
      );
      this.textIndex++;
      setTimeout(() => {
        this.typing();
        this.cdRef.detectChanges(); // Trigger Angular's change detection
      }, 100);
    }
  }



}
