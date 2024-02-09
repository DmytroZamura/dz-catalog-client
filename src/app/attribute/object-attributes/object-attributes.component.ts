import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ObjectAttribute, ObjectAttributeValue, AttributeValue} from '../attribute';

import {GeneralService} from '../../general/general.service';



@Component({
  selector: 'app-object-attributes',
  templateUrl: './object-attributes.component.html',
  styleUrls: ['./object-attributes.component.css']
})
export class ObjectAttributesComponent implements OnInit {
  @Input() attributes: ObjectAttribute[];
  @Input() editMode = false;
  @Input() show: true;
   @Input() showNewAttribute = true;
  @Output() attributesChanged = new EventEmitter<void>();


  constructor( private service: GeneralService) {
  }

  ngOnInit() {

  }


  initDefaultAttributes(category: number, show = false) {
    if (show) {
      this.show = true;
    }
    if (this.show) {
      let attributes: ObjectAttribute[] = [];
      attributes = attributes.concat(this.attributes);

        if (this.attributes.length >= 0) {

          const user_attributes: ObjectAttribute[] = [];

          for (const attribute of attributes) {
            if (attribute.user_attribute) {

              user_attributes.push(attribute);

            }

          }

          attributes = user_attributes;
        }


      if (category) {

        const endpoint = `${'get-category-attributes/'}${category}`;

        this.service.getItems(endpoint)
         .then(res => {
            if (res) {


              for (const attribute of res) {
                const new_attribute = new ObjectAttribute();
                new_attribute.user_attribute = false;
                new_attribute.values = [];
                new_attribute.attribute = attribute.attribute_details.id;
                new_attribute.attribute_details = attribute.attribute_details;
                new_attribute.multiple = attribute.attribute_details.multiple;
                attributes.push(new_attribute);
              }

            }
            this.attributes = attributes;

          })
          .catch(error => {
            console.log(error);
          });


      } else {
        this.attributes = attributes;
      }
    }

  }

  getAttributes(): ObjectAttribute[] {

    return this.attributes;
  }

  addAttribute() {
    const attribute = new ObjectAttribute();
    attribute.values = [];
    attribute.user_attribute = true;
    attribute.editName = true;
    attribute.multiple = false;
    this.attributes.push(attribute);
  }

  deleteAttribute(index: number) {
    this.attributes.splice(index, 1);
     this.onAttributesChanged();
  }

  onMultiSelectChange(values: AttributeValue[], index: number) {
    this.attributes[index].values = [];
    for (const value of values) {
      const new_value = new ObjectAttributeValue();
      new_value.value_list = value.id;
      this.attributes[index].values.push(new_value);
    }

  }

   onAttributesChanged() {
    this.attributesChanged.emit();
  }


}
