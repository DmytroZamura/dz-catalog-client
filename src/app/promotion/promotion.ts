import {PaymentAccount} from './payment-accounts/payment-account';
import {CommonItem} from '../general/common-item';
import {PostShort} from '../post/post';
import {CompanyShort} from '../company/company';
import {ProductShort} from '../product/product';

export class Promotion {
  price: number;
  product: PaymentProduct;
  object: any;
  account: PaymentAccount;
}

export class PaymentProduct {
  id: number;
  name: string;
  code: string;
  description: string;
  unit_type: number;
  unit_type_details: CommonItem;
}


export class PaymentOrder {
  id: number;
  account: number;
  payment_product: number;
  payment_product_details: PaymentProduct;
  quantity: number;
  promoted_post: number;
  promoted_company: number;
  promoted_product: number;
  promoted_post_details: PostShort;
  promoted_company_details: CompanyShort;
  promoted_product_details: ProductShort;
  price: number;
  sum: number;
  create_date: string;
}
