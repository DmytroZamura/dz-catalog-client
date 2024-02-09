import {Component, Input, OnInit} from '@angular/core';

import {Profile, UserWithProfile} from '../../profile';

import {Router} from '@angular/router';


@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.css']
})
export class ProfileOverviewComponent implements OnInit {

  @Input() profile: Profile;
  @Input() currentUserId;
  @Input() admin: false;
  @Input() isBrowser = false;
  @Input() language = 'en';


  userWithProfile: UserWithProfile;


  constructor( private router: Router) {
  }

  ngOnInit() {

this.setUserWithProfile();


  }

  setProfile(profile: Profile) {
    this.profile = profile;
    this.setUserWithProfile();
  }

  setUserWithProfile() {
    this.userWithProfile = new UserWithProfile();
    this.userWithProfile.user_profile = this.profile;
    this.userWithProfile.user_profile_default = this.profile;

  }

  onEditProfile() {
    this.router.navigate(['/profile/']);

  }





}
