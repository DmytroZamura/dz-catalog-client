import {UserFile} from '../common/file/file';
import {ProductShort} from '../product/product';
import {UserWithProfile} from '../profile/profile';
import {CompanyShort} from '../company/company';
import {Currency} from '../general/currency';
import {Chat} from '../messaging/messaging';
import {CommonItem} from '../general/common-item';
import {AttachedDocument} from '../common/attached-documents/attached-document';

export class SupplyRequestNote {
  id: number;
  supply_request: number;
  user: number;
  reason_win_lost: string;
  update_date: string;
}


export class SupplyRequestDocument {
  id: number;
  file: number;
  file_details: UserFile;
}

export class SupplyRequestPosition {
  id: number;
  supply_request: number;
  product: number;
  product_details: ProductShort;
  product_default_details: ProductShort;
  price: number;
  quantity: number;
  total: number;
  comment: string;
  update_date: string;

}


export class SupplyRequest {
  id: number;
  supplier_request_id: string;
  status: number;
  status_details: CommonItem;
  need_confirmation: boolean;
  customer_user: number;
  customer_user_details: UserWithProfile;
  customer_company: number;
  customer_company_details: CompanyShort;
  customer_company_default_details: CompanyShort;
  customer_comment: string;
  contact_email: string;
  contact_phone: string;
  skype: string;
  supplier_user: number;
  supplier_user_details: UserWithProfile;
  supplier_company: number;
  supplier_company_details: CompanyShort;
  supplier_company_default_details: CompanyShort;
  supplier_comment: string;
  currency: number;
  currency_details: Currency;
  positions: SupplyRequestPosition[];
  documents: AttachedDocument[];
  charges: number;
  charges_comment: string;
  total_amount: number;
  delivery_address: string;
  chat: number;
  chat_details: SupplyRequestChat;
  update_date: string;
  create_date: string;
  canceled_by: number;

}


// export class SupplyRequestShort {
//   id: number;
//   supplier_request_id: string;
//   status: number;
//   status_details: CommonItem;
//   customer_user: number;
//   customer_user_details: UserWithProfile;
//   customer_company: number;
//   customer_company_details: CompanyShort;
//   contact_email: string;
//   contact_phone: string;
//   skype: string;
//   supplier_user: number;
//   supplier_user_details: UserWithProfile;
//   supplier_company: number;
//   supplier_company_details: CompanyShort;
//   supplier_comment: string;
//   customer_comment: string;
//   currency: number;
//   currency_details: Currency;
//   charges: number;
//   charges_comment: string;
//   chat: number;
//   chat_details: SupplyRequestChat;
//   total_amount: number;
//   delivery_address: string;
//   update_date: string;
//   create_date: string;
//   canceled_by: number;
//
// }


export class SupplyRequestChat {
  id: number;
  supply_request: number;
  chat: number;
  chat_details: Chat;

}


