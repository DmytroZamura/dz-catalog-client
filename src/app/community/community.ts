import {UserWithProfile} from '../profile/profile';
import {Country} from '../general/country';
import {City} from '../general/city';
import {Category} from '../category/category';
import {UserImage} from '../common/file/file';
import {Company, CompanyShort} from '../company/company';

export class Community {
  id: number;
  name: string;
  description: string;
  rules: string;
  owner: number;
  owner_details: UserWithProfile;
  image: number;
  image_details: UserImage;
  open: boolean;
  show_products: boolean;
  moderator_check_invite: boolean;
  local_community: boolean;
  country: number;
  country_details: Country;
  city: number;
  city_details: City;
  create_date: Date;
  language_code: string;
  tags: string[];
  // - TODO Delete this
  current_user_admin = false;
  current_user_member = false;
  current_user_member_id: number;
  // - TODO Delete this
  member_status: boolean;
  admin_status: boolean;
  invitation_status: string;
  eventsqty: CommunityEventsQty;
}


export class CommunityShort {
  id: number;
  name: string;
  open: boolean;

  member_status: boolean;
  admin_status: boolean;
  image_details: UserImage;
}


export class CommunityCategory {
  id: number;
  community: number;
  name: string;
  category: number;
  category_details: Category;
  community_category: boolean;
  child_qty: number;
}


export class CommunityMember {
  id: number;
  community: number;
  user: number;
  user_details: UserWithProfile;
  admin: boolean;
}


export class CommunityCompany {
  id: number;
  community: number;
  company: number;
  company_details: Company;
  company_default_details: Company;
  create_date: Date;

}

export class CommunityInvitation {
  id: number;
  community: number;
  company: number;
  company_details: Company;
  company_default_details: Company;
  user: number;
  user_details: UserWithProfile;
  message: string;
  accepted: boolean;
  pending: boolean;
  create_date: Date;
  user_acceptance: boolean;
  accepted_by_user: boolean;

}

export class CommunityEventsQty {
 members: number;
 companies: number;
 publications_total: number;
 jobposts: number;
 publications: number;
 offerings: number;
 requests: number;
 invitations: number;
}



