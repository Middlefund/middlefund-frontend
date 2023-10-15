import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyIncorporationService {
  private stageSubject!: BehaviorSubject<number>
  public stage!: Observable<number>
  constructor(private fb: FormBuilder) {
    this.stageSubject = new BehaviorSubject(1);
    this.stage = this.stageSubject.asObservable();
  }

  readonly companyIncorporationForm = this.fb.group({
      companyName: ['', Validators.required],
      companyType: [null, Validators.required],
      businessName: ['', Validators.required],
      industryName: [null, Validators.required],
      activities: ['', Validators.required]
  });

  public updateStage(stage: number) {
    return this.stageSubject.next(stage)
  }

  public get currentStage() {
    return this.stageSubject.value || 1
  }

}
