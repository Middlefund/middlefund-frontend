import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent implements OnInit {

  @Input() iconUrl!: string 
  @Input() placeholder!: string

  constructor(){}

  ngOnInit(): void {
      
  }

}
