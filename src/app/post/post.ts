import {UserWithProfile} from '../profile/profile';
import {Category, SuggestedCategory} from '../category/category';
import {CompanyShort} from '../company/company';
import {ProductShort} from '../product/product';
import {Currency} from '../general/currency';
import {Country} from '../general/country';
import {UnitType} from '../general/unit-type';
import {ObjectImage} from '../common/object-file';
import {ObjectAttribute} from '../attribute/attribute';
import {City} from '../general/city';
import {CommunityShort} from '../community/community';
import {CommonItem} from '../general/common-item';
import {AttachedDocument} from '../common/attached-documents/attached-document';


export class PostType {
  id: number;
  feed_id: number;
  code: string;
  name: string;
}


export class Post {
  id: number;
  shared_post: number;
  shared_post_details: Post;
  user: number;
  url: string;
  slug: string;
  tags: string[];
  site_name: string;
  is_video_url: boolean;
  company: number;
  company_details: CompanyShort;
  company_default_details: CompanyShort;
  community: number;
  community_details: CommunityShort;
  community_default_details: CommunityShort;
  product: number;
  product_details: ProductShort;
  product_default_details: ProductShort;
  related_user: number;
  related_user_data: UserWithProfile;
  related_company: number;
  related_company_details: CompanyShort;
  related_company_default_details: CompanyShort;
  related_product: number;
  related_product_default_details: ProductShort;
  related_product_details: ProductShort;
  category: number;
  category_details: Category;
  suggested_category: number;
  suggested_category_details: SuggestedCategory;
  type: number;
  type_details: CommonItem;
  country: number;
  country_details: Country;
  city: number;
  city_name: string;
  city_details: City;
  post_title: string;
  seo_title: string;
  comment: string;
  title: string;
  description: string;
  image_url: string;
  published = false;
  user_data: UserWithProfile;
  show_comments = false;
  post_request: PostRequest;
  post_offering: PostOffering;
  post_job: PostJob;
  post_review: PostReview;
  article: ArticleShort;

  admin_status: boolean;
  can_delete_status: boolean;
  applicant_status: boolean;
  responder_status: boolean;
  documents: AttachedDocument[];
  post_options: PostOption[];
  images: ObjectImage[];
  post_request_positions: PostRequestPosition[];
  attributes: ObjectAttribute[];
  eventsqty: PostEventsQty;
  like_status: boolean;
  favorite_status: boolean;
  multi_selection: boolean;
  post_language: string;
  promotion: boolean;
  promotion_date: string;
  promotion_grade: number;
  create_date: string;
  deadline: string;
  deleted: boolean;
}

export class PostPreview extends Post {
  related_posts: RelatedPost[];
}

export class RelatedPost {
  id: number;
  post: number;
  related_post: number;
  related_post_details: PostShort;
  create_date: string;
}


export class PostShort {

  id: number;
  type: number;
  country_details: Country;
  city_details: City;
  category_details: Category;
  article: ArticleShort;
  type_details: CommonItem;
  title: string;
  description: string;
  site_name: string;
  images: ObjectImage[];
  comment: string;
  post_title: string;
  create_date: string;
  user: number;
  user_data: UserWithProfile;
  company: number;
  company_details: CompanyShort;
  company_default_details: CompanyShort;
  slug: string;
  url: string;
  image_url: string;
  post_request: PostRequest;
  post_offering: PostOffering;
  post_job: PostJob;
  deadline: string;
  deleted: boolean;
  published: boolean;
  promotion: boolean;
  promotion_grade: number;
  promotion_date: string;
}

export class PostMiddle {

  id: number;
  type: number;
  tags: string[];
  type_details: CommonItem;
  post_title: string;
  create_date: string;
  user: number;
  user_data: UserWithProfile;
  company: number;
  company_details: CompanyShort;
  company_default_details: CompanyShort;
  slug: string;
  deleted: boolean;
  published: boolean;
  category: number;
  category_details: Category;
  country: number;
  country_details: Country;
  city: number;
  city_details: City;
  eventsqty: PostEventsQty;
  like_status: boolean;
  admin_status: boolean;
  favorite_status: boolean;
  show_comments = false;
  related_posts: RelatedPost[];
  promotion: boolean;


}

export class ArticleShort {
  title: string;
  title_draft: string;
  description: string;

}


export class PostEventsQty {
  comments = 0;
  likes = 0;
  shares = 0;
  applicants = 0;
  new_applicants = 0;
  responds = 0;
  new_responds = 0;
  votes = 0;
  impressions = 0;
  views = 0;
  user_impressions = 0;
  user_views = 0;
  engagements = 0;
}


export class PostCategory {
  id: number;
  post: number;
  category: number;
  category_details: Category;
}


export class PostRequest {
  deadline: string;
  price_currency: number;
  price_currency_details: CommonItem;
  delivery_address: string;

}

export class PostOffering {
  type: number;
  price_currency: number;
  price_currency_details: CommonItem;
  price: number;
  price_usd: number;
  price_from: number;
  price_usd_from: number;
  discount: number;
  discount_price_from: number;
  discount_price: number;
  discount_price_usd_from: number;
  discount_price_usd: number;
  one_price: boolean;
  unit_type: number;
  unit_type_details: CommonItem;

}


export class PostJob {
  job_type: number;
  job_type_details: CommonItem;
  job_function: number;
  job_function_details: CommonItem;
  seniority: number;
  seniority_details: CommonItem;
  salary_currency: number;
  salary_currency_details: Currency;
  salary: number;
  resume_required: boolean;
}


export class PostReview {

  advantages: string;
  disadvantages: string;
  rating: number;
}


export class PostRequestPosition {
  id: number;
  index: number;
  name: string;
  unit: number;
  unit_details: UnitType;
  quantity: number;
  comment: string;


}


export class PostOption {
  id: number;
  name: string;
  votes: number;
  position: number;
  votes_percent: number;
  vote_status: boolean;
}


export class PostOptionVote {
  id: number;
  user: number;
  option: number;
  post: number;
  user_date: UserWithProfile;
  create_date: string;
}


export class Activity {
  actor: UserWithProfile;
  id: string;
  target: any;
  object: any;
  verb: string;
  message: string;
  time: string;
}


export class AggregatedFeedItem {
  activities: Activity[];
  activity_count: number;
  actor_count: number;
  created_at: string;
  verb: string;
  id: string;
  is_read: boolean;
  is_seen: boolean;

}


export class PostFeedFilter {
  id: number;
  filter_name: string;
  post_type_details: CommonItem;
  country_details: Country;
  city_details: City;
  category_details: Category;
  job_type_details: CommonItem;
  job_function_details: CommonItem;
  seniority_details: CommonItem;


}


export class InitialArticle {
  user: number;
  company: number;
  product: number;
  community: number;
  country: number;
  city: number;
  default_lang: number;
  category: number;
}


export function cutPostUrl(url: string, comment: string): string {

  let newComment: string;

  const url1 = `${'<a href="'}${url}${'" target="_blank">'}${url}${'</a>'}`;
  const url2 = `${'<a href="'}${url}${'" rel="noopener noreferrer" target="_blank">'}${url}${'</a>'}`;
  const url3 = `${'<a href="'}${url}${'" rel="noopener noreferrer nofollow" target="_blank">'}${url}${'</a>'}`;
  newComment = (comment.replace(url1, '')).replace(url2, '').replace(url3, '');

  if (newComment === '<p></p>' || newComment === '') {
    newComment = null;
  }

  return newComment;
}


export function getPostLink(post: Post): string {


  let urlType = '/post/';

  if (post.slug) {

    if (post.type_details.code === 'article') {
      urlType = '/article/';
    }
    let subject = '';
    let sslug = '';
    if (post.company) {
      subject = 'c';
      sslug = post.company_default_details.slug;
    } else {
      subject = 'u';
      sslug = post.user_data.user_profile_default.slug;
    }
    return `${urlType}${subject}${'/'}${sslug}${'/'}${post.slug}`;

  } else {

    return `${urlType}${post.id}`;

  }

}
