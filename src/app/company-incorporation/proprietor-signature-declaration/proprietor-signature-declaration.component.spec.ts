import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietorSignatureDeclarationComponent } from './proprietor-signature-declaration.component';

describe('ProprietorSignatureDeclarationComponent', () => {
  let component: ProprietorSignatureDeclarationComponent;
  let fixture: ComponentFixture<ProprietorSignatureDeclarationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProprietorSignatureDeclarationComponent]
    });
    fixture = TestBed.createComponent(ProprietorSignatureDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
