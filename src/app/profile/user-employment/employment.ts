import {CompanyShort} from '../../company/company';
import {Country} from '../../general/country';
import {City} from '../../general/city';

export class UserEmployment {
  id: number;
  profile: number;
  company: number;
  company_details: CompanyShort;
  company_default_details: CompanyShort;
  company_name: string;
  country: number;
  country_details: Country;
  city: number;
  city_details: City;
  city_name: string;
  start_date: string;
  end_date: string;
  present_time = false;
  education: boolean;
  position: number;
  title: string;
  description: string;
  language_code: string;


}
