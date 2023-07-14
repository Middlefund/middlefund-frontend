import {inject, Injectable} from "@angular/core";
import {PitchSubmissionService} from "../pitch-submission/pitch-submission.service";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormDataAppender {
  constructor(private pitchSubmissionService: PitchSubmissionService) {
  }
  appendFormData(form: FormGroup) {
    const formData = this.pitchSubmissionService.pitchFormData

    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);

      if (control instanceof FormGroup) {
        this.appendNestedFormData(control, key, formData);
      } else {
        formData.set(key, control?.value);
      }
    });
  }

  appendNestedFormData(formGroup: any, parentKey: string, formData: FormData) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      const formKey = `${parentKey}.${key}`;

      if (control instanceof FormGroup) {
        this.appendNestedFormData(control, formKey, formData);
      } else {
        formData.set(formKey, control.value);
      }
    });
  }

  appendObject(object) {
    const formData = this.pitchSubmissionService.pitchFormData
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.set(key, data[key]);
      }
    }
  }

}
