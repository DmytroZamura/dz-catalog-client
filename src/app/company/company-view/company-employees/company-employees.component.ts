import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-company-employees',
  templateUrl: './company-employees.component.html',
  styleUrls: ['./company-employees.component.css']
})
export class CompanyEmployeesComponent implements OnInit {
  @Input() company_id: number;
  @Input() isMobile = false;
  @Input() locale = 'en';
  @Input() currentUserId = 0;
  @Output() msgPushed = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

   onMsgPushed(event) {
    this.msgPushed.emit(event);

  }


}
