import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { HeroComponent } from './home/hero/hero.component';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { CardComponent } from './home/how-it-works/card/card.component';
import { InvestorHeroComponent } from './home/investor-hero/investor-hero.component';
import { StartupHeroComponent } from './home/startup-hero/startup-hero.component';
import { FooterComponent } from './home/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BlogComponent } from './home/blog/blog.component';
import { SharedModule } from './shared/shared.module';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProfileInitials } from './utility/profileInitials';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './utility/auth-interceptor.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  GoogleSigninButtonModule,
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { HeroVideoComponent } from './home/hero-video/hero-video.component';
import { CompanyIncorporationComponent } from './company-incorporation/company-incorporation.component';
import { CompanyIncorporationModule } from './company-incorporation/company-incorporation.module';
import { IncorporationInfoComponent } from './incorporation-info/incorporation-info.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AboutUsComponent } from './home/about-us/about-us.component';
import { LottieComponent } from 'ngx-lottie';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

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
    HeroVideoComponent,
    CompanyIncorporationComponent,
    AboutUsComponent,
    IncorporationInfoComponent,
    ContactUsComponent,
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
    MatProgressSpinnerModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    CompanyIncorporationModule,
    MatTooltipModule,
    LottieComponent,
    NgCircleProgressModule.forRoot({
      radius: 20,
      space: -7,
      outerStrokeGradient: true,
      outerStrokeWidth: 7,
      outerStrokeColor: '#A49370',
      outerStrokeGradientStopColor: '#A49370',
      innerStrokeColor: 'white',
      innerStrokeWidth: 7,
      animateTitle: false,
      animationDuration: 1000,
      titleFontSize: '10',
      unitsFontSize: '10',
      unitsColor: 'white',
      titleColor: 'white',
      showBackground: false,
      clockwise: false,
      startFromZero: false,
      showSubtitle: false,
      showUnits: true,
      units: '%',
      lazy: true,
    }),
  ],
  providers: [
    ProfileInitials,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '13347839115-9t4f8ofavoiu5bru41c748q34g4904dp.apps.googleusercontent.com',
            ),
          },
        ],
        onError: (err: Error) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
