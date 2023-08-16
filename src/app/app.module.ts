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
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProfileInitials} from "./utility/profileInitials";
import {ToastrModule} from "ngx-toastr";
import {AuthInterceptor} from "./utility/auth-interceptor.service";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {  ReactiveFormsModule } from '@angular/forms';
import {
  GoogleSigninButtonModule,
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider
} from "@abacritt/angularx-social-login";

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
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  providers: [
    ProfileInitials,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: 'SocialAuthServiceConfig', useValue: {
      autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '13347839115-9t4f8ofavoiu5bru41c748q34g4904dp.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err: Error) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
