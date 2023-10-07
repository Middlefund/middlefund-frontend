import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyIncorporationComponent } from './company-incorporation.component';

describe('CompanyIncorporationComponent', () => {
  let component: CompanyIncorporationComponent;
  let fixture: ComponentFixture<CompanyIncorporationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyIncorporationComponent]
    });
    fixture = TestBed.createComponent(CompanyIncorporationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
