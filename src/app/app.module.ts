import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import {MatIconModule} from "@angular/material/icon";
import { HeroComponent } from './home/hero/hero.component';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { CardComponent } from './home/how-it-works/card/card.component';
import { InvestorHeroComponent } from './home/investor-hero/investor-hero.component';
import { StartupHeroComponent } from './home/startup-hero/startup-hero.component';
import { FooterComponent } from './home/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BlogComponent } from './home/blog/blog.component';
import {SharedModule} from "./shared/shared.module";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    HeroComponent,
    HowItWorksComponent,
    CardComponent,
    InvestorHeroComponent,
    StartupHeroComponent,
    FooterComponent,
    BlogComponent,
    TermsAndConditionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FontAwesomeModule,
    SharedModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
