import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceDashboardComponent } from './workspace-dashboard.component';

describe('WorkspaceDashboardComponent', () => {
  let component: WorkspaceDashboardComponent;
  let fixture: ComponentFixture<WorkspaceDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspaceDashboardComponent]
    });
    fixture = TestBed.createComponent(WorkspaceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
