import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompanyShort} from '../company';
import {Router} from '@angular/router';
import {GeneralService} from '../../general/general.service';


@Component({
  selector: 'app-company-info-card',
  templateUrl: './company-info-card.component.html',
  styleUrls: ['./company-info-card.component.css']
})
export class CompanyInfoCardComponent implements OnInit {
  @Input() company: CompanyShort;
  @Input() companyId: number;
  @Input() curretUser: number;
  @Input() isMobile = false;
  @Input() canDelete = false;
  @Input() showDetails = true;
  @Input() message: string;
  @Input() locale = 'en';

  @Output() companyDeleted = new EventEmitter<void>();
  @Output() itemClicked = new EventEmitter<void>();
  publications_total = 0;
  truncateNumber = 100;


  constructor(private router: Router, private service: GeneralService) {
  }

  ngOnInit() {
    if (this.isMobile) {
      this.truncateNumber = 70;
    }


    if (this.company) {
      this.initPiblicationsTotal();
    } else {
      if (this.companyId) {
        this.getCompanyShort();
      }
    }
  }


  initPiblicationsTotal() {
    this.publications_total = this.company.eventsqty.requests + this.company.eventsqty.publications + this.company.eventsqty.jobposts + this.company.eventsqty.offerings;

  }


  getCompanyShort(): void {
    const url = `${'get-company-details-short/'}${this.companyId}`;
    this.service.getItem(url)
    .then(res => {

        this.company = res;
        this.initPiblicationsTotal();


      })
      .catch(error => {
        console.log(error);
      });



  }


  showCompany() {

    this.router.navigate(['/company/' + this.company.slug + '/' + this.locale]);
    this.itemClicked.emit();
  }

  deleteCompany() {
    this.companyDeleted.emit();
  }

  onItemClicked() {

    this.itemClicked.emit();
  }


}



