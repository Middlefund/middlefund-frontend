import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-accounts-layout',
  templateUrl: './accounts-layout.component.html',
  styleUrls: ['./accounts-layout.component.css']
})
export class AccountsLayoutComponent {
  @Input() question: string = ''
  @Input() info: string = ''
  @Input() src: string = ''
  @Input() button: string = ''
  @Input() route: string = ''
}
