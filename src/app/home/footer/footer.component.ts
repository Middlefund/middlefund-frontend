import { Component, OnInit } from '@angular/core';
import { faLinkedin, faInstagram, faTwitter, faFacebook,faFacebookF,faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faLinkedin = faLinkedin
  faLinkedinIn = faLinkedinIn
  faInstagram = faInstagram
  faTwitter   = faTwitter
  faFacebook  = faFacebook
  faFacebookF  = faFacebookF
  faEnvelope  = faEnvelope

  constructor (){}

  ngOnInit(): void{}
}
