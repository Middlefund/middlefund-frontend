import {Component, OnInit} from '@angular/core';
import {AccountsService} from "../../accounts/accounts.service";
import {ProfileInitials} from "../../utility/profileInitials";
import {FormBuilder, Validators} from "@angular/forms";
import {SettingsService} from "../settings.service";
import {ToastrService} from "ngx-toastr";
import {AlertService} from "../../alert";
import {fullNameValidator} from "../../utility/validators.directive";

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit{
  image: string = ''
  formData: FormData = new FormData()
  isLoading: boolean = false

  constructor(private accountsService: AccountsService,
              private profileInitials: ProfileInitials,
              private fb: FormBuilder,
              private settingsService: SettingsService,
              private toast: ToastrService,
              private alert: AlertService) {
  }
  ngOnInit() {
    this.setData()
    const user = this.accountsService.userData
    this.image =  user.avatar ? user.avatar : this.profileInitials.createImageFromInitials()
  }

  setData() {
    const user = this.accountsService.userData
    this.personalInformationForm.get('fullName')?.setValue(user.name)
    this.personalInformationForm.get('email')?.setValue(user.email)
    this.personalInformationForm.get('avatar')?.setValue(user.avatar)
    this.image = user.avatar
  }

  onAvatarChange(event: any) {
    const file = event.target.files[0];
    this.formData.append('avatar', file)
    this.personalInformationForm.patchValue({ avatar: file });

    // Check if the file is an image
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.image = e.target.result
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  }

  personalInformationForm = this.fb.group({
    fullName: ['', [fullNameValidator()]],
    avatar: [null, Validators.required],
    email: [{value: '', disabled: true}, Validators.required]
  })

  onSubmit() {
    if(this.personalInformationForm.valid) {
      this.isLoading = true;
      this.formData.append('fullName', this.personalInformationForm.controls.fullName.value!)
      this.settingsService.changePersonalSettings(this.formData).subscribe({
        next: value => {
          const user: {token:object, user: object} = JSON.parse(localStorage.getItem('middlefund$user')!)
          user.user = value.data
          localStorage.setItem('middlefund$user', JSON.stringify(user))
          this.accountsService.updateUser(user)
          this.toast.success(value.message)
          this.alert.success(value.message)
          this.isLoading = false;
        },
        error: err => {
          this.toast.error(err.error.error)
          this.alert.error(err.error.message)
          this.isLoading = false;
        }
      })
    }
  }


}
