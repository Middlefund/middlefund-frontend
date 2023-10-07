import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-verification-success',
  templateUrl: './verification-success.component.html',
  styleUrls: ['./verification-success.component.css']
})
export class VerificationSuccessComponent implements OnInit {
  private token: string = ''
  title: string = 'Verification Complete!'
  message: string = 'Thank you for completing your email verification.'
  remarks: string = 'Welcome onboard!'
  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.route.params.subscribe(value => {
      this.token = value['token'];
    })
  }

  ngOnInit() {

    if (this.router.url.startsWith('/invite-login/') && this.token) {
      this.title = 'Invitation accepted successfully';
      this.message = 'Thank you for accepting the invite of your team, go ahead and collaborate'
      this.remarks = 'Join team on platinum'
    }
  }
}
