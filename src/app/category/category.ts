

export class Category {
  id: number;
  name: string;
  description: string;
  parent: number;
  image: string;
  image_url: string;
  background_image_url: string;
  background_image: string;
  small_image_url: string;
  name_with_parent: string;
  slug: string;
  child_qty: number;
  user: number;

}

export class CategoryParentSet {
  id: number;
  name: string;
  description: string;
  parent: number;
  image: string;
  image_url: string;
  small_image_url: string;
  background_image_url: string;
  background_image: string;
  name_with_parent: string;
  slug: string;
  child_qty: number;
  user: number;
  parent_details: CategoryParentSet;
}

export class SuggestedCategory {
  id: number;
  user: number;
  parent: number;
  name: string;
  reviewed: boolean;
}
