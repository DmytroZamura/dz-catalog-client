import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectItem} from 'primeng/api';


@Component({
  selector: 'app-offering-type',
  templateUrl: './offering-type.component.html',
  styleUrls: ['./offering-type.component.css']
})
export class OfferingTypeComponent implements OnInit {


  @Input() type: number;
  @Output() typeChange = new EventEmitter<number>();
  types: SelectItem[] = [{label: 'Sales', value: 1}, {label: 'Rent', value: 2}, {label: 'Promotions', value: 3}];

// promotions and discounts
  constructor() {
  }

  ngOnInit() {

  }


  onTypeChange() {
    this.typeChange.emit(this.type);
  }

}
