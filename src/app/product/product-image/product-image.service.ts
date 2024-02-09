import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../config/config.service';
import {ProductImage} from '../product';


@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

   endpoint = AppConfig.settings.endPointUrl;

  constructor(public http: HttpClient) {
  }

  getProductImages(product: number): Promise<ProductImage[]> {
    const url = `${this.endpoint}${'get-product_images/'}${product}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as ProductImage[])
      .catch(this.handleError);
  }

   getProductImage(product: number): Promise<ProductImage> {
    const url = `${this.endpoint}${'get-product_image/'}${product}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as ProductImage)
      .catch(this.handleError);
  }

  createProductImage(image: ProductImage): Promise<ProductImage> {
    const url = `${this.endpoint}${'create-product_image/'}`;
    return this.http
      .post(url, JSON.stringify(image))
      .toPromise()
      .then(response => response as ProductImage)
      .catch(this.handleError);
  }

  deleteProductImage(pk: number): Promise<void> {
    const url = `${this.endpoint}${'delete-product_image/'}${pk}${'/'}`;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }


    private handleError(error: any): Promise<any> {

    return Promise.reject(error.message || error);
  }


}
