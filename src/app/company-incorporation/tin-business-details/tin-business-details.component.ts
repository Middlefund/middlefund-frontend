import {Component, inject} from '@angular/core';
import {CompanyIncorporationService} from "../company-incorporation.service";
import {yesOrNo} from "../../utility/constants";

@Component({
  selector: 'app-tin-business-details',
  templateUrl: './tin-business-details.component.html',
  styleUrls: ['./tin-business-details.component.css']
})
export class TinBusinessDetailsComponent {
  tinBusinessDetailsForm = inject(CompanyIncorporationService).tinBusinessDetailsForm

  constructor(private incorporationService: CompanyIncorporationService,) {
  }

  onSubmit() {
    console.log(this.tinBusinessDetailsForm.value)
  }

  onPrevious() {
    this.incorporationService.updateTinStage(2)
  }

  protected readonly yesOrNo = yesOrNo;
}
