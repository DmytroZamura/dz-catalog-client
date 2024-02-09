import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AttributeValue, ObjectAttribute, ObjectAttributeValue} from './attribute';

import {GeneralService} from '../general/general.service';


@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {
  @Input() attributeId = 0;
  @Input() attribute: ObjectAttribute;
  @Input() editMode = false;
  @Output() multiSelectChanged = new EventEmitter<AttributeValue[]>();
  @Output() attributeChanged = new EventEmitter<void>();
  name: string;
  values: AttributeValue[];
  object_values: AttributeValue[];

  constructor(private service: GeneralService) {
  }

  ngOnInit() {
    if (!this.attribute.values) {
      this.attribute.values = [];
    }

    if (!this.attribute.values[0]) {
      if (!this.attribute.multiple) {
        const value = new ObjectAttributeValue();
        this.attribute.values.push(value);
      }
    }

    if (this.attribute.user_attribute) {
      this.name = this.attribute.name;
    } else {
      this.name = this.attribute.attribute_details.name;
    }

    if (!this.attribute.user_attribute) {
      if (this.attribute.attribute_details.type === 1) {
        if (this.attribute.multiple && this.attribute.values[0]) {
          const values: AttributeValue[] = [];
          for (const value of this.attribute.values) {
            const new_value = new AttributeValue();
            new_value.id = value.value_list;
            new_value.name = value.value_list_details.name;
            values.push(new_value);
          }
          this.object_values = values;
        }
        this.getValues();
      }
    }

  }


  onNameInput() {
    this.name = this.attribute.name;
  }


  getValues() {
    const endpoint = `${'get-attribute-values/'}${this.attribute.attribute}`;
    this.service.getItems(endpoint)
     .then(res => {
        this.values = res;
      })
      .catch(error => {
        console.log(error);
      });

  }

  onValueChanged(event) {

    if (event.value) {
      this.attribute.values[0].value_list = event.value.id;
    } else {
      this.attribute.values[0].value_list = null;
    }
    this.onAttributeChanged();
  }

  onMultiSelectChange() {
    this.multiSelectChanged.emit(this.object_values);
    this.onAttributeChanged();
  }


  onAttributeChanged() {
    this.attributeChanged.emit();
  }

}
