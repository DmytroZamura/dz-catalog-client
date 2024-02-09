import {Country} from '../general/country';
import {UserImage} from '../common/file/file';
import {Category} from '../category/category';
import {UserWithProfile} from '../profile/profile';
import {City} from '../general/city';

export class Company {
  id: number;
  name: string;
  slug: string;
  seo_title: string;
  seo_description: string;
  headline: string;
  country: number;
  country_details: Country;
  short_description: string;
  logo: number;
  logo_details: UserImage;
  website: string;
  linkedin: string;
  follow_status: boolean;
  company_industry: number;
  company_industry_details: CompanyIndustry;
  company_type: number;
  company_type_details: CompanyType;
  company_size: number;
  company_size_details: CompanySize;
  city: number;
  city_details: City;
  city_name: string;
  address: string;
  postal_code: string;
  phone_number: string;
  sales_email: string;
  business_email: string;
  foundation_year: number;
  eventsqty: CompanyEventsQty;
  tags: string[];
  language_code: string;
  create_date: string;
  update_date: string;
  favorite_status: boolean;
  admin_status: boolean;
  deleted: boolean;
}

export class CompanyShort {
  id: number;
  name: string;
  slug: string;
  headline: string;
  logo_details: UserImage;
  company_industry: number;
  company_industry_details: CompanyIndustry;
  company_type_details: CompanyType;
  company_type: number;
  company_size: number;
  company_size_details: CompanySize;
  language_code: string;
  country_details: Country;
  city_details: City;
  foundation_year: number;
  eventsqty: CompanyEventsQty;
  follow_status: boolean;
  deleted: boolean;
}

export class CompanyName {
  id: number;
  name: string;
  headline: string;
}


export class CompanyIndustry {
  id: number;
  name: string;
  slug: string;
}

export class CompanyType {
  id: number;
  name: string;
  slug: string;
}

export class CompanySize {
  id: number;
  name: string;
  slug: string;
}

export class CompanyCategory {
  id: number;
  company: number;
  category: number;
  category_details: Category;
  company_category = true;
  child_qty: number;
}


export class CompanyUser {
  id: number;
  company: number;
  company_details: CompanyShort;
  user: number;
  user_details: UserWithProfile;
  admin: boolean;
  sales: boolean;
  supply: boolean;
}

export class CompanyFollower {
  id: number;
  company: number;
  company_details: CompanyShort;
  company_default_details: CompanyShort;
  user: number;
  user_details: UserWithProfile;
}

export class CompanyEventsQty {
  followers = 0;
  employees = 0;
  students = 0;
  jobposts = 0;
  publications = 0;
  offerings = 0;
  requests = 0;
  products = 0;
  publications_total = 0;
  new_messages = 0;
  new_job_responds = 0;
  new_offering_reponds = 0;
  new_request_responds = 0;
  new_customer_requests = 0;
  open_customer_requests = 0;
  your_open_supply_requests = 0;
  your_open_offering_responds = 0;
  your_open_request_responds = 0;

  rating = 0;
  reviews = 0;
  questions = 0;
  related_reviews = 0;
  related_questions = 0;
}
