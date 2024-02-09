import {UserWithProfile} from '../../profile/profile';
import {Company} from '../../company/company';
import {Currency} from '../../general/currency';

export class PaymentAccount {
  id: number;
  user: number;
  user_details: UserWithProfile;
  company: number;
  company_details: Company;
  company_default_details: Company;
  currency: number;
  currency_details: Currency;
  balance: number;
}

export class Payment {
  id: number;
  account: number;
  sum: number;
  callback_link: string;
  create_date: string;
}
