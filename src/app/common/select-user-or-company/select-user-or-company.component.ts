import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MenuItem, SelectItem} from 'primeng/api';
import {Subscription} from 'rxjs';
import {SignalService} from '../../signal.service';
import {BrowserService} from '../../browser.service';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {UserOrCompany} from './user-or-company';
import {UtilsService} from '../../utils.service';
import {ProfileShort} from '../../profile/profile';
import {GeneralService} from '../../general/general.service';

@Component({
  selector: 'app-select-user-or-company',
  templateUrl: './select-user-or-company.component.html',
  styleUrls: ['./select-user-or-company.component.css']
})
export class SelectUserOrCompanyComponent implements OnInit, OnDestroy {

  @Input() selected_company: number;
  @Input() forced_selection = false;
  @Input() profile: ProfileShort;
  @Input() disabled = false;
  @Input() clearAfterSelection = false;
  @Input() viewType = 1; // 1 - dropdownView; 2 - listBoxView; 3 - TabMenuView
  @Input() showUnreadMessages = false;
  @Output() selectedRole = new EventEmitter<any>();
  isBrowser = false;
  currentUserId = 0;
  private subscription: Subscription;
  items: SelectItem[];
  menuItems: MenuItem[];
  selectedItem: UserOrCompany;
  activeTab = 0;
  unreadUserMessages = 0;


  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private browserService: BrowserService,
             private service: GeneralService,
               private signalService: SignalService) {
    this.isBrowser = browserService.isBrowser;
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.currentUserId = +localStorage.getItem('user_id');
      if (this.currentUserId) {

        if (this.viewType === 3) {
          this.menuItems = [];
        }

        if (!this.profile) {
          this.getUserProfile();
        } else {
          this.setUserProfile(this.profile);
        }

      }

      if (this.showUnreadMessages) {

        const subscription = this.signalService.unreadMessages.subscribe(res => {

          this.unreadUserMessages = res.user_count;
          if (this.items[0]) {
            this.items[0].value.unreadCount = res.user_count;
          }

          this.refreshCompanyCount();

        });
        this.subscription = new Subscription();
        this.subscription.add(subscription);
      }
    }
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  setUserProfile(profile: ProfileShort) {
    this.items = [];
      let unreadCount = 0;
        if (this.viewType === 3 && this.showUnreadMessages) {
          this.signalService.getMessagesCount()
            .then(rescount => {

              unreadCount = rescount.user_count;


            })
            .catch(error => {
              console.log(error);
            });
        }

        let name = profile.nickname;

        if (profile.first_name) {
          name = profile.first_name + ' ' + profile.last_name;
        }

        const newValue = new UserOrCompany();

        newValue.id = this.currentUserId;
        newValue.name = name;
        newValue.image = profile.img_details;
        newValue.user = true;
        newValue.unreadCount = unreadCount;
        newValue.country_details = profile.country_details;
        newValue.city_details = profile.city_details;



        this.items.push({label: name, value: newValue});

        if (this.viewType === 3) {
          this.menuItems.push({
            label: name,
            command: (event: any) => {
              this.activeTab = 0;
              this.onSelectItem(this.items[0]);

            }
          });
        }


        if (!this.selected_company && this.viewType !== 2) {
          this.selectedItem = newValue;
          this.selectedRole.emit(this.selectedItem);
        }


        this.getUserCompanies();
  }

  getUserProfile(): void {
    const url = `${'get-short-user-profile/'}${this.currentUserId}`;
    this.service.getItem(url)
     .then(res => {

      this.setUserProfile(res);


      })
      .catch(error => {
        console.log(error);
      });



  }

  refreshCompanyCount() {
    if (this.items[1] && this.showUnreadMessages && this.viewType === 3) {
      for (const item of this.items) {
        if (!item.value.user) {


          this.signalService.getCompanyMessagesCount(item.value.id)
            .then(rescount => {

              item.value.unreadCount = rescount.company_count;


            })
            .catch(error => {
              console.log(error);
            });


        }

      }
    }
  }


  getUserCompanies() {
    const url = `${'get-user-companies/'}${this.currentUserId}`;
    this.service.getItems(url)
    .then(objects => {
        // let index = 1;
        let unreadCount = 0;
        for (const {item, index} of UtilsService.toItemIndexes(objects)) {


          if (this.viewType === 3 && this.showUnreadMessages) {
            this.signalService.getCompanyMessagesCount(item.company)
              .then(rescount => {

                unreadCount = rescount.company_count;


              })
              .catch(error => {
                console.log(error);
              });
          }

          const newValue = new UserOrCompany();

          newValue.id = item.company;
          newValue.name = item.company_details.name;
          newValue.image = item.company_details.logo_details;
          newValue.user = false;
          newValue.unreadCount = unreadCount;
          newValue.country_details = item.company_details.country_details;
          newValue.city_details = item.company_details.city_details;

          this.items.push({label: item.company_details.name, value: newValue});

          if (this.viewType === 3) {

            this.menuItems.push({
              label: item.company_details.name,
              command: (event: any) => {

                this.activeTab = index + 1;

                this.onSelectItem(this.items[index + 1]);

              }
            });
          }


          if (item.company === this.selected_company && (!this.disabled || this.forced_selection)) {

            this.activeTab = index + 1;
            this.selectedItem = newValue;

            this.selectedRole.emit(this.selectedItem);

          }
          // index = index + 1;
        }


      })
      .catch(error => {
        console.log(error);
      });


  }

  onSelectItem(event) {
    if (!this.disabled) {
      if (this.clearAfterSelection) {
        this.selectedItem = null;
      }
      this.selectedRole.emit(event.value);

    }
  }

}
