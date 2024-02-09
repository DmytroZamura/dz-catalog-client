import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Company} from '../../company/company';
import {Router} from '@angular/router';

@Component({
  selector: 'app-company-feed-preview',
  templateUrl: './company-feed-preview.component.html',
  styleUrls: ['./company-feed-preview.component.css']
})
export class CompanyFeedPreviewComponent implements OnInit {
  @Input() company: Company;
  @Input() user: number;
  @Input() canManage = false;
  @Input() acceptButton = false;
  @Input() locale = 'en';
  @Output() msgPushed = new EventEmitter<any>();
  @Output() companyDeleted = new EventEmitter<void>();
  @Output() accepted = new EventEmitter<void>();
  @Output() rejected = new EventEmitter<void>();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }


  showCompany() {

    this.router.navigate(['/company/' + this.company.slug + '/' + this.locale]);

  }


   deleteCompany() {
    this.companyDeleted.emit();
  }

  acceptCompany() {
    this.accepted.emit();
  }

  rejectCompany() {
    this.rejected.emit();
  }

  onMsgPushed(event) {
    this.msgPushed.emit(event);

  }


}
