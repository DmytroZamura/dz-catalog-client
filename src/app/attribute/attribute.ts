import {UnitType} from '../general/unit-type';

export class Attribute {
  id: number;
  type: number;
  multiple: boolean;
  unit_type: number;
  unit_type_details: UnitType;
  name: string;

}


export class FilterValue {
  type: number;
  attribute: Attribute;
  value_boolean: boolean;
  value_list: AttributeValue;
  values: number[];
  multiple = false;
}

export class FilterValueDB {
  type: number;
  attribute: number;
  value_boolean: boolean;
  value_list: number;
  values: number[];
  multiple = false;
}

export class FilterSet {
  currency: number;
  price_from: number;
  price_to: number;
  filterValues: FilterValue[];
}
export class AttributeValue {
  id: number;
  name: string;
}


export class CategoryAttribute {
  id: number;
  category: number;
  attribute: number;
  attribute_details: Attribute;
  default_attribute: boolean;
  min: number;
  max: number;
  step: number;
  filter_value: FilterValue;

}

export class ObjectAttributeValue {
  id: number;
  value_string: string;
  value_number: number;
  value_integer: number;
  value_boolean: boolean;
  value_list: number;
  value_list_details: AttributeValue;
}

export class ObjectAttribute {
  id: number;
  attribute: number;
  attribute_details: Attribute;
  name: string;
  user_attribute: boolean;
  editName = false;
  multiple: boolean;
  values: ObjectAttributeValue[];
}





