import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../config/config.service';

import {Country} from './country';
import {Language, Translation} from './language';
import {UnitType} from './unit-type';
import {Currency} from './currency';
import {UtilsService} from '../utils.service';
import {City} from './city';
import {CommonItem} from './common-item';
import {Article, NewArticle} from '../post/article/article';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  endpoint = AppConfig.settings.endPointUrl;


  constructor(public http: HttpClient) {

  }


  getLanguages(): Promise<Language[]> {

    const url = `${this.endpoint}${'languages/'}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response as Language[])
      .catch(UtilsService.handleError);
  }


  createArticle(article: NewArticle): Promise<Article> {
    const url = `${this.endpoint}${'create-article/'}`;
    return this.http
      .post(url, JSON.stringify(article))
      .toPromise()
      .then(response => response as Article)
      .catch(UtilsService.handleError);

  }


  getUnitTypes(): Promise<UnitType[]> {
    const url = `${this.endpoint}${'unit-types/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as UnitType[])
      .catch(UtilsService.handleError);
  }


  getCurrencies(): Promise<Currency[]> {
    const url = `${this.endpoint}${'currencies/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Currency[])
      .catch(UtilsService.handleError);
  }

  getCurrency(id: number): Promise<Currency> {
    const url = `${this.endpoint}${'currency/'}${id}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Currency)
      .catch(UtilsService.handleError);
  }

  getTranslation(code: string): Promise<Translation> {
    const url = `${this.endpoint}${'translation/'}${code}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Translation)
      .catch(UtilsService.handleError);
  }



  getLanguageByCode(code: string): Promise<Language> {
    const url = `${this.endpoint}${'language-by-code/'}${code}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Language)
      .catch(UtilsService.handleError);
  }


  getFilteredCountries(text: string): Promise<Country[]> {
    const url = `${this.endpoint}${'country-search/'}${text}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Country[])
      .catch(UtilsService.handleError);
  }

  // getFilteredCities(text: string): Promise<City[]> {
  //   const url = `${this.endpoint}${'city-search/'}${text}${'/'}`;
  //   return this.http.get(url)
  //     .toPromise()
  //     .then(response => response as City[])
  //     .catch(UtilsService.handleError);
  // }

  getFilteredCitiesByCountry(country: number, text: string): Promise<City[]> {
    const url = `${this.endpoint}${'city-of-country-search/'}${country}${'/'}${text}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as City[])
      .catch(UtilsService.handleError);
  }


  getCityByName(country: number, text: string): Promise<City> {
    const url = `${this.endpoint}${'get-city-by-name/'}${country}${'/'}${text}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as City)
      .catch(UtilsService.handleError);
  }


  getCitiesList(): Promise<City[]> {
    const url = `${this.endpoint}${'cities/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as City[])
      .catch(UtilsService.handleError);
  }

  getCitiesByCountryList(country: number): Promise<City[]> {
    const url = `${this.endpoint}${'cities-of-country/'}${country}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as City[])
      .catch(UtilsService.handleError);
  }


  // getFilteredLanguages(text: string): Promise<Language[]> {
  //   const url = `${this.endpoint}${'language-search/'}${text}${'/'}`;
  //   return this.http.get(url)
  //     .toPromise()
  //     .then(response => response as Language[])
  //     .catch(UtilsService.handleError);
  // }

  geoCitySearch(latitude: number, longitude: number): Promise<City[]> {
    const url = `${this.endpoint}${'geo-search/'}${latitude}${'/'}${longitude}${'/'}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as City[])
      .catch(UtilsService.handleError);
  }


  createItem(endpoint: string, item: any): Promise<any> {
    const url = `${this.endpoint}${endpoint}${'/'}`;
    return this.http
      .post(url, JSON.stringify(item))
      .toPromise()
      .then(response => response as any)
      .catch(UtilsService.handleError);

  }

  updateItem(endpoint: string, item: any): Promise<any> {
    const url = `${this.endpoint}${endpoint}${'/'}`;
    return this.http
      .put(url, JSON.stringify(item))
      .toPromise()
      .then(response => response as any)
      .catch(UtilsService.handleError);

  }


  getCommonItems(endpoint: string, filter = ''): Promise<CommonItem[]> {
    const url = `${this.endpoint}${endpoint}${'/'}${filter}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as CommonItem[])
      .catch(UtilsService.handleError);
  }


  deleteItemByPk(endpoint: string, pk: number): Promise<void> {
    let url = `${this.endpoint}${endpoint}`;
    if (pk) {
      url = `${url}${pk}${'/'}`;
    }
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(UtilsService.handleError);
  }


  getItemsByPage(endpoint: string, page: number, filter: string): Promise<any[]> {
    const url = `${this.endpoint}${endpoint}${page}${'/'}${filter}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as any[])
      .catch(UtilsService.handleError);
  }

  getItems(endpoint: string, filter: string = ''): Promise<any[]> {
    const url = `${this.endpoint}${endpoint}${'/'}${filter}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as any[])
      .catch(UtilsService.handleError);
  }

  getItem(endpoint: string, filter: string = ''): Promise<any> {
    const url = `${this.endpoint}${endpoint}${'/'}${filter}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as any)
      .catch(UtilsService.handleError);
  }


}
