import {FilterSet} from '../attribute/attribute';
import {Country, Region} from '../general/country';
import {City} from '../general/city';
import {Category} from '../category/category';
import {ProductGroup} from '../product/product';
import {CompanyIndustry, CompanySize, CompanyType} from '../company/company';
import {CommonItem} from '../general/common-item';


export class FeedFilter {
  filter_id: number;
  following_status: boolean;
  following_id: number;
  able_to_follow: boolean;
}

export class UniversalFilter {
  post_type: CommonItem;
  country: Country;
  region: Region;
  city: City;
  category: Category;
  product_group: ProductGroup;
  company_industry: CompanyIndustry;
  company_type: CompanyType;
  company_size: CompanySize;
  job_type: CommonItem;
  job_function: CommonItem;
  seniority_label: CommonItem;
  filterSet: FilterSet;
  search_word: string;
  currency: number;
  salary_from: number;
  salary_to: number;
  clearAtributes = false;
  applicantStatus: CommonItem;
  respondStatus: CommonItem;
  requestStatus: CommonItem;

  constructor() {
    this.post_type = null;
    this.country = null;
    this.region = null;
    this.city = null;
    this.category = null;
    this.product_group = null;
    this.company_size = null;
    this.company_industry = null;
    this.company_type = null;
    this.filterSet = null;
  }
}


export class RouteParams {
  post_type: string;
  country: string;
  region: string;
  city: string;
  category: string;
  product_group: number;
  company_industry: string;
  company_type: string;
  company_size: string;
  job_type: string;
  job_function: string;
  seniority_label: string;


  constructor() {
    this.post_type = null;
    this.country = null;
    this.region = null;
    this.city = null;
    this.category = null;
    this.product_group = null;
    this.company_size = null;
    this.company_industry = null;
    this.company_type = null;
    this.job_type = null;
    this.job_function = null;
    this.seniority_label = null;

  }
}

export class FilterParams {
  post_type: number;
  country: number;
  region: number;
  city: number;
  category: number;
  job_type: number;
  job_function: number;
  seniority: number;

  constructor() {
    this.post_type = null;
    this.country = null;
    this.city = null;
    this.category = null;
    this.job_type = null;
    this.job_function = null;
    this.seniority = null;

  }
}

