import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinSignatureComponent } from './tin-signature.component';

describe('TinSignatureComponent', () => {
  let component: TinSignatureComponent;
  let fixture: ComponentFixture<TinSignatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TinSignatureComponent]
    });
    fixture = TestBed.createComponent(TinSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
