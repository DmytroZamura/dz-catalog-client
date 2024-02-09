import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../config/config.service';
import {Category, CategoryParentSet, SuggestedCategory} from './category';
import {UtilsService} from '../utils.service';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

   endpoint = AppConfig.settings.endPointUrl;

  constructor(public http: HttpClient) {
  }


  getFilteredCategories(text: string, filter = ''): Promise<Category[]> {
    const url = `${this.endpoint}${'categories-search/'}${text}${'/'}${filter}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Category[])
      .catch(UtilsService.handleError);
  }

  getFilteredCategoriesFroProfile(text: string, profile: number, interest: string): Promise<Category[]> {
    const url = `${this.endpoint}${'get_profile-categories-for-select/'}${profile}${'/'}${interest}${'/'}${text}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Category[])
      .catch(UtilsService.handleError);
  }

  getCategoryChilds(parent: number, filter = ''): Promise<Category[]> {
    const url = `${this.endpoint}${'category-child-set/'}${parent}${'/'}${filter}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Category[])
      .catch(UtilsService.handleError);

  }

    getCategoryParents(id: number): Promise<CategoryParentSet> {
    const url = `${this.endpoint}${'category-parent-set/'}${id}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as CategoryParentSet)
      .catch(UtilsService.handleError);

  }

  suggestCategory(category: SuggestedCategory): Promise<SuggestedCategory> {
    const url = `${this.endpoint}${'create-suggested-category/'}`;
    return this.http
      .post(url, JSON.stringify(category))
      .toPromise()
      .then(response => response as SuggestedCategory)
      .catch(UtilsService.handleError);

  }

}
