import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../config/config.service';
import {Product, ProductCategory, ProductGroup, ProductImage} from './product';
import {UtilsService} from '../utils.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

   endpoint = AppConfig.settings.endPointUrl;

  constructor(public http: HttpClient) {
  }

  getProduct(product: number, current_currency: number): Promise<Product> {
    const url = `${this.endpoint}${'get-product-details/'}${product}${'/'}${current_currency}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Product)
      .catch(UtilsService.handleError);
  }

  getProductInLanguage(product: number, lang: string, current_currency: number): Promise<Product> {
    const url = `${this.endpoint}${'get-product-details-in-language/'}${product}${'/'}${lang}${'/'}${current_currency}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Product)
      .catch(UtilsService.handleError);
  }

  getProductBySlug(subject: string, sslug: string, slug: string, current_currency: number): Promise<Product> {
    const url = `${this.endpoint}${'get-product-by-slug/'}${subject}${'/'}${sslug}${'/'}${slug}${'/'}${current_currency}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Product)
      .catch(UtilsService.handleError);
  }

  createProduct(product: Product): Promise<Product> {
    const url = `${this.endpoint}${'create-product/'}`;
    return this.http
      .post(url, JSON.stringify(product))
      .toPromise()
      .then(response => response as Product)
      .catch(UtilsService.handleError);

  }


  updateProduct(product: Product, lang: string): Promise<Product> {
    const url = `${this.endpoint}${'update-product-details/'}${product.id}${'/'}${lang}${'/'}`;

    return this.http
      .put(url, JSON.stringify(product))
      .toPromise()
      .then(response => response as Product)
      .catch(UtilsService.handleError);
  }


  deleteProduct(pk: number): Promise<void> {
    const url = `${this.endpoint}${'delete-product/'}${pk}${'/'}`;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(UtilsService.handleError);
  }


  createProductGroup(group: ProductGroup): Promise<ProductGroup> {
    const url = `${this.endpoint}${'create-product-group/'}`;
    return this.http
      .post(url, JSON.stringify(group))
      .toPromise()
      .then(response => response as ProductGroup)
      .catch(UtilsService.handleError);

  }

  updateProductGroup(group: ProductGroup, lang: string): Promise<ProductGroup> {
    const url = `${this.endpoint}${'update-product-group/'}${group.id}${'/'}${lang}${'/'}`;

    return this.http
      .put(url, JSON.stringify(group))
      .toPromise()
      .then(response => response as ProductGroup)
      .catch(UtilsService.handleError);
  }


  deleteProductGroup(pk: number): Promise<void> {
    const url = `${this.endpoint}${'delete-product-group/'}${pk}${'/'}`;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(UtilsService.handleError);
  }

  searchCompanyProductGroups(company: number, name: number): Promise<ProductGroup[]> {
    const url = `${this.endpoint}${'search-company-product-groups/'}${company}${'/'}${name}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as ProductGroup[])
      .catch(UtilsService.handleError);
  }

  searchUserProductGroups(user: number, name: number): Promise<ProductGroup[]> {
    const url = `${this.endpoint}${'search-user-product-groups/'}${user}${'/'}${name}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as ProductGroup[])
      .catch(UtilsService.handleError);
  }

  getCompanyChildProductGroups(company: number, parent: number, language: string): Promise<ProductGroup[]> {
    const url = `${this.endpoint}${'get-company-child-product-groups/'}${company}${'/'}${parent}${'/'}${language}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as ProductGroup[])
      .catch(UtilsService.handleError);
  }


  getUserChildProductGroups(user: number, parent: number, language: string): Promise<ProductGroup[]> {
    const url = `${this.endpoint}${'get-user-child-product-groups/'}${user}${'/'}${parent}${'/'}${language}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as ProductGroup[])
      .catch(UtilsService.handleError);
  }


  getUserProductsByPage(user: number, page: number, current_currency: number): Promise<Product[]> {
    const url = `${this.endpoint}${'user-products-by-page/'}${user}${'/'}${page}${'/'}${current_currency}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Product[])
      .catch(UtilsService.handleError);
  }


  getProductsByPage(page: number, filter: string): Promise<Product[]> {
    const url = `${this.endpoint}${'products-by-page/'}${page}${'/'}${filter}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Product[])
      .catch(UtilsService.handleError);
  }

  getCurrentUserProductsByPage(page: number, current_currency: number): Promise<Product[]> {
    const url = `${this.endpoint}${'user-products-by-page/'}${page}${'/'}${current_currency}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Product[])
      .catch(UtilsService.handleError);
  }


  createProductCategory(category: ProductCategory): Promise<ProductCategory> {

    const url = `${this.endpoint}${'create-product-category/'}`;
    return this.http
      .post(url, JSON.stringify(category))
      .toPromise()
      .then(response => response as ProductCategory)
      .catch(UtilsService.handleError);

  }

  getProductCategories(product: number): Promise<ProductCategory[]> {

    const url = `${this.endpoint}${'get-product-categories/'}${product}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as ProductCategory[])
      .catch(UtilsService.handleError);
  }

  createProductImage(image: ProductImage): Promise<ProductImage> {
    const url = `${this.endpoint}${'create-product_image/'}`;
    return this.http
      .post(url, JSON.stringify(image))
      .toPromise()
      .then(response => response as ProductImage)
      .catch(UtilsService.handleError);

  }


}


