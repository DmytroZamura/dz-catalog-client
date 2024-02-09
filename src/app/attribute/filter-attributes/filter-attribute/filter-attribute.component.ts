import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Attribute, AttributeValue, FilterValue} from '../../attribute';
import {GeneralService} from '../../../general/general.service';

@Component({
  selector: 'app-filter-attribute',
  templateUrl: './filter-attribute.component.html',
  styleUrls: ['./filter-attribute.component.css']
})
export class FilterAttributeComponent implements OnInit {
  @Input() attribute: Attribute;

  @Input() step = 1;
  @Input() min = 0;
  @Input() max = 100;

  @Output() valueChanged = new EventEmitter<FilterValue>();
  values: AttributeValue[];

  value_range: number[] = [0, 1000];
  value_multiple: AttributeValue[];
  value_boolean = false;
  value_list: AttributeValue;


  constructor(private service: GeneralService) {
  }


  ngOnInit() {
    if (this.attribute.type === 1) {
      this.getValues();
    }

    if (this.attribute.type === 2 || this.attribute.type === 5) {
      if (!this.min) {
        this.min = 0;
      }
      if (!this.max) {
        this.max = 100;
      }
      if (!this.step) {
        this.step = 1;
      }

      this.value_range[0] = this.min;


      this.value_range[1] = this.max;


    }

  }


  getValues() {
    const endpoint = `${'get-attribute-values/'}${this.attribute.id}`;
    this.service.getItems(endpoint)
    .then(res => {
        this.values = res;
      })
      .catch(error => {
        console.log(error);
      });

  }

  onValueChanged(event) {

    let value = new FilterValue();
    value.type = this.attribute.type;
    value.attribute = this.attribute;
    if (this.attribute.type === 1 && !this.attribute.multiple) {
      if (this.value_list) {
        value.value_list = this.value_list;
      } else {
        value = null;
      }
    }

     if (this.attribute.type === 4) {
      if (this.value_boolean) {
        value.value_boolean = this.value_boolean;
      } else {
        value = null;
      }
    }

      if (this.attribute.type === 2 || this.attribute.type === 5 ) {
      value.values = this.value_range;
    }

      if (this.attribute.type === 1 && this.attribute.multiple ) {
      if (this.value_multiple.length > 0) {
        value.values = [];
        value.multiple = true;
        for (const mult_value of this.value_multiple) {
          value.values.push(mult_value.id);

        }
      } else {
        value = null;
      }
    }

    this.valueChanged.emit(value);
  }




}
