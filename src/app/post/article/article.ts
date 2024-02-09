import {Category} from '../../category/category';
import {Country} from '../../general/country';
import {City} from '../../general/city';
import {UserImage} from '../../common/file/file';
import {Language} from '../../general/language';
import {PostMiddle} from '../post';

export class NewArticle {
  user: number;
  company: number;
  product: number;
  category: number;
  country: number;
  city: number;
  default_lang: number;
}


export class Article {
  post: number;
  post_details: PostMiddle;

  draft_category: number;
  draft_category_details: Category;
  draft_country: number;
  draft_country_details: Country;
  draft_city: number;
  draft_city_details: City;
  tags: string[];
  default_lang: number;
  default_lang_details: Number;
  image: number;
  image_details: UserImage;
  image_draft: number;
  image_draft_details: UserImage;
  title: string;
  seo_title: string;
  description: string;
  text: string;
  title_draft: string;
  seo_title_draft: string;
  description_draft: string;
  text_draft: string;
  link_canonical: string;
  link_canonical_draft: string;
  to_publish: boolean;
  languages: Language[];
  languages_to_add: Language[];
  language_code: string;
}
