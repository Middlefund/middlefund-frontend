import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AccountsService} from "../../accounts/accounts.service";
import {ProfileInitials} from "../../utility/profileInitials";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.css']
})
export class ProfileDropdownComponent implements OnInit {
  isProfileMenuOpen: boolean = false;
  name: string = ''
  image: string = ''
  loggingOut: boolean = false;

  constructor(private accountsService: AccountsService,
              private profileInitials: ProfileInitials,
              private router: Router,
              private toast: ToastrService) {
  }

  ngOnInit() {
    this.accountsService.user.subscribe(value => {
      this.image = value.user.avatar ? value.user.avatar : this.profileInitials.createImageFromInitials()
      this.name = value.user.name
    })
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const isClickedOutside = !(event.target as HTMLElement).closest('.profileMenu');
    const isProfileButton = !(event.target as HTMLElement).closest('.profileButton');
    if (isClickedOutside && isProfileButton) {
      this.isProfileMenuOpen = false;
    }
  }

  logout() {
    this.loggingOut = true;
    this.accountsService.logout().subscribe({
      next: () => {

        localStorage.clear()
        this.accountsService.updateUser('')
        this.toast.success("You have successfully logged out")
        this.router.navigateByUrl('/login').then(r => r)
        this.loggingOut = false;
      },
      error: () => {
        this.toast.error("An error has occurred while logging out, Try again!")
        this.loggingOut = false;
      }
    });
  }
}
