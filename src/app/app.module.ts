import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { LogoComponent } from './shared/logo/logo.component';
import {MatIconModule} from "@angular/material/icon";
import { HeroComponent } from './home/hero/hero.component';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { CardComponent } from './home/how-it-works/card/card.component';
import { InvestorHeroComponent } from './home/investor-hero/investor-hero.component';
import { StartupHeroComponent } from './home/startup-hero/startup-hero.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LogoComponent,
    HeroComponent,
    HowItWorksComponent,
    CardComponent,
    InvestorHeroComponent,
    StartupHeroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
