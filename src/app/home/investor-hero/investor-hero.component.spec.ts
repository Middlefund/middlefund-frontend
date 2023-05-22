import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorHeroComponent } from './investor-hero.component';

describe('InvestorHeroComponent', () => {
  let component: InvestorHeroComponent;
  let fixture: ComponentFixture<InvestorHeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestorHeroComponent]
    });
    fixture = TestBed.createComponent(InvestorHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
