import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroVideoComponent } from './hero-video.component';

describe('HeroVideoComponent', () => {
  let component: HeroVideoComponent;
  let fixture: ComponentFixture<HeroVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroVideoComponent]
    });
    fixture = TestBed.createComponent(HeroVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
