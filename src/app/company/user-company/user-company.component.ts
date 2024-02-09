import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { CompanyUser} from '../company';
import {Router} from '@angular/router';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {isPlatformBrowser} from '@angular/common';
import {MetaService} from '../../meta.service';
import {StandardMessageService} from '../../standard-message.service';
import {AppComponent} from '../../app.component';
import {GeneralService} from '../../general/general.service';

@Component({
  selector: 'app-user-company',
  templateUrl: './user-company.component.html',
  styleUrls: ['./user-company.component.css']
})
export class UserCompanyComponent implements OnInit {

  isBrowser = false;

  currentUserId = 0;
  user_companies: CompanyUser[];


  constructor(private service: GeneralService,
              @Inject(PLATFORM_ID) private platformId: any,
              private messageService: StandardMessageService, public app: AppComponent,
              private router: Router, @Inject(LOCAL_STORAGE) private localStorage: any, private metaService: MetaService) {
    this.isBrowser = isPlatformBrowser(this.platformId);


  }

  ngOnInit() {


  this.app.appService.setLanguage();

    if (this.isBrowser) {
      this.currentUserId = +localStorage.getItem('user_id');
      this.getUserCompanies();
    }

    this.metaService.addMetaTags('manage-company', null,
      null, null, null, null, false, null, null);
  }

  onCreateCompany() {
    this.app.onCreateCompany();
  }



  onEditCompany(index: number) {
    this.router.navigate(['/company-admin/' + this.user_companies[index].company_details.slug]);

  }



  getUserCompanies() {

      const url = `${'get-user-companies/'}${this.currentUserId}`;
      this.service.getItems(url)
     .then(res => {
        this.user_companies = res;


      })
      .catch(error => {
        this.handleError(error);
      });


  }



  private handleError(error: any): void {
    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }

}
