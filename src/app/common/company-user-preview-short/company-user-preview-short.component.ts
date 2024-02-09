import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UserWithProfile} from '../../profile/profile';
import {CompanyShort} from '../../company/company';

@Component({
  selector: 'app-company-user-preview-short',
  templateUrl: './company-user-preview-short.component.html',
  styleUrls: ['./company-user-preview-short.component.css']
})
export class CompanyUserPreviewShortComponent implements OnInit {
  @Input() userData: UserWithProfile;
  @Input() company: CompanyShort;
  @Input() showLink = true;
  @Input() message: string;
  @Input() locale = 'en';
  @Input() size = 'middle'; // small, middle
  @Input() truncate_number = 25;
  @Output() itemClicked = new EventEmitter<void>();


  constructor(private router: Router) {
  }

  ngOnInit() {
  }


  showProfile() {

    if (this.showLink &&  this.userData.user_profile_default.is_active) {
      this.router.navigate(['/user-profile/' + this.userData.user_profile.slug + '/' + this.locale]);
      this.itemClicked.emit();
    }
  }

  showCompany() {

    if (this.showLink && !this.company.deleted) {
      this.router.navigate(['/company/' + this.company.slug + '/' + this.locale]);
      this.itemClicked.emit();
    }
  }
}
