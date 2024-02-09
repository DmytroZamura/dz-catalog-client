import {Country} from '../general/country';
import {Language} from '../general/language';
import {UserImage} from '../common/file/file';
import {Category} from '../category/category';
import {City} from '../general/city';
import {Currency} from '../general/currency';


export class Profile {
  id: number;
  user_id: number;
  has_companies: boolean;
  nickname: string;
  slug: string;
  first_name: string;
  last_name: string;
  full_name: string;
  follow_status: boolean;
  following_status: boolean;

  headline: string;
  short_description: string;
  interface_lang: number;
  country: number;
  contact_email: string;
  contact_phone: string;
  skype: string;
  website: string;
  language_details: Language;
  country_details: Country;
  city: number;
  city_details: City;
  city_name: string;
  img: number;
  img_details: UserImage;
  language_code = 'en';
  default_currency: string;
  eventsqty: UserProfileEventsQty;
  tags: string[];
  settings_checked: boolean;
  is_active: boolean;
  deleted: boolean;
  notifications_sound: boolean;
  message_sound: boolean;
  tester: boolean;

  constructor() {
    this.language_details = new Language();
    this.country_details = new Country();


  }
}

export class UserSettings {

  id: number;
  user_id: number;
  nickname: string;
  slug: string;
  email: string;
  interface_lang: number;
  language_details: Language;
  default_currency: number;
  default_currency_details: Currency;
  country: number;
  country_details: Country;
  city: number;
  city_details: City;
  settings_checked: boolean;
  notifications_sound: boolean;
  message_sound: boolean;
  notifications_email: boolean;
  message_email: boolean;

  constructor() {
    this.language_details = new Language();
  }

}


export class ProfileShort {
  id: number;
  user_id: number;
  nickname: string;
  slug: string;
  first_name: string;
  last_name: string;
  full_name: string;
  headline: string;
  img_details: UserImage;
  country_details: Country;
  city_details: City;
  follow_status: boolean;
  following_status: boolean;
  eventsqty: UserProfileEventsQty;
  is_active: boolean;
  deleted: boolean;
}

export class UserWithProfile {
  user_profile: ProfileShort;
  user_profile_default: ProfileShort;
}

export class UserProfileCategory {
  id: number;
  profile: number;
  category: number;
  category_details: Category;
  child_qty: number;
  interest: boolean; // True - interest; False - offer
  profile_category = true;
}


export class UserProfileCountryInterest {
  id: number;
  profile: number;
  country: number;
  country_details: Country;
}


export class UserProfileInitCategorySelect {

  profile: number;

  interest: boolean; // True - interest; False - offer

}

// export class UserContact {
//   id: number;
//   user: number;
//   user_details: UserWithProfile;
//   contact: number;
//   contact_details: UserWithProfile;
//   contact_invitation = false;
//   invitation_note: string;
//   contact_accepted = false;
//   following = false;
//
// }


export class UserProfileFollower {
  id: number;
  profile: number;
  profile_details: ProfileShort;
  profile_default_details: ProfileShort;
  user: number;
  user_details: UserWithProfile;
}

export class UserProfileEventsQty {
  following = 0;
  followers = 0;
  jobposts = 0;
  publications = 0;
  offerings = 0;
  requests = 0;
  products = 0;
  notifications = 0;
  new_messages = 0;
  new_job_responds = 0;
  new_offering_reponds = 0;
  new_request_responds = 0;
  new_customer_requests = 0;
  open_customer_requests = 0;
  your_open_supply_requests = 0;
  your_open_offering_responds = 0;
  your_open_request_responds = 0;
  your_open_job_responds = 0;
  favorite_posts = 0;
  favorite_companies = 0;
  favorite_products = 0;
  favorite_communities = 0;
  favorite_tags = 0;
  reviews = 0;
  rating = 0;
  questions = 0;
  related_reviews = 0;
  related_questions = 0;
}


