import {UserWithProfile} from '../profile/profile';
import {Category, SuggestedCategory} from '../category/category';
import {Country} from '../general/country';
import {UnitType} from '../general/unit-type';
import {UserImage} from '../common/file/file';
import {CompanyShort} from '../company/company';
import {ObjectAttribute} from '../attribute/attribute';
import {CommonItem} from '../general/common-item';


export class Product {
  id: number;
  name: string;
  images: ProductImage[];
  slug: string;
  seo_title: string;
  seo_description: string;

  product_group: number;
  product_group_details: ProductGroup;
  product_group_details_default: ProductGroup;
  category: number;
  category_details: Category;
  suggested_category: number;
  suggested_category_details: SuggestedCategory;
  short_description: string;
  model_number: string;
  brand_name: string;
  origin: number;
  origin_details: Country;
  product_or_service: boolean;
  unit_type: number;
  unit_type_details: CommonItem;
  user: number;
  user_data: UserWithProfile;
  company: number;
  company_details: CompanyShort;
  company_default_details: CompanyShort;
  published = false;
  price_from: number;
  price_from_current_currency: number;
  price_to: number;
  price_to_current_currency: number;
  discount: number;
  discount_price_from: number;
  discount_price_to: number;
  discount_price_from_current_currency: number;
  discount_price_to_current_currency: number;
  deadline: string;


  one_price = true;
  currency: number;
  currency_details: CommonItem;
  price_conditions: string;
  link_to_buy: string;
  packaging_and_delivery: string;
  attributes: ObjectAttribute[];
  tags: string[];
  create_date: Date;
  language_code = 'en';
  favorite_status: boolean;
  admin_status: boolean;
  eventsqty: ProductEventsQty;
  deleted: boolean;



}


export class ProductShort {
  id: number;
  name: string;
  slug: string;
  images: ProductImage[];
  product_or_service: boolean;
  unit_type: number;
  unit_type_details: UnitType;
  category: number;
  category_details: Category;
  eventsqty: ProductEventsQty;
  origin_details: Country;
  company_details: CompanyShort;
  company_default_details: CompanyShort;
  user_data: UserWithProfile;
  one_price: boolean;
  price_from: number;
  price_to: number;
  price_from_current_currency: number;
  price_to_current_currency: number;
  discount: number;
  discount_price_from: number;
  discount_price_to: number;
  discount_price_from_current_currency: number;
  discount_price_to_current_currency: number;
  deadline: string;

  published = false;
  deleted: boolean;




}


export class ProductGroup {
  id: number;
  name: string;
  company: number;
  user: number;
  parent: number;
  child_qty: number;
  language_code: string;
  changed = false;

}


export class ProductImage {
  id: number;
  product: number;
  image: number;
  image_details: UserImage;
  position: number;
  title: string;
  description: string;
}

export class ProductCategory {
  id: number;
  product: number;
  category: number;
  category_details: Category;
  product_category = true;
}


export class ProductFilter {
  user: number;
}


export class ProductEventsQty {
  publications = 0;
  reviews = 0;
  rating = 0;
  questions = 0;
  videos = 0;
  related_reviews = 0;
  related_questions = 0;
}


export function getProductLink(product: ProductShort): string {
  const urlType = '/product/';

  if (product.slug) {

    let subject = '';
    let sslug = '';
    if (product.company_default_details) {
      subject = 'c';
      sslug = product.company_default_details.slug;
    } else {
      subject = 'u';
      sslug = product.user_data.user_profile_default.slug;
    }
    return `${urlType}${subject}${'/'}${sslug}${'/'}${product.slug}${'/'}`;
  } else {
    return `${urlType}${product.id}`;
  }

}
