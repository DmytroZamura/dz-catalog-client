import {Post} from '../../post/post';
import {Company} from '../../company/company';
import {Product} from '../../product/product';

export class FavoritePost {
  id: number;
  post: number;
  user: number;
  post_details: Post;
}

export class FavoriteCompany {
  id: number;
  company: number;
  user: number;
  company_details: Company;
}

export class FavoriteProduct {
  id: number;
  product: number;
  user: number;
  product_details: Product;
}





