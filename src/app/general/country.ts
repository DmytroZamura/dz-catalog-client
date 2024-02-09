import {UserFile} from '../common/file/file';
import {Currency} from './currency';

export class Country {
  id: number;
  code: string;
  slug: string;
  name: string;
  short_name: string;
  flag_url: UserFile;
  flag: number;
  currency: number;
  currency_details: Currency;
}


export class Region {
  id: number;
  slug: string;
  country: number;
  country_details: Country;
  name: string;
}
