import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../config/config.service';
import {UtilsService} from '../../utils.service';
import {Suggestion} from './suggestion';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
 endpoint = AppConfig.settings.endPointUrl;

  constructor(public http: HttpClient) {
  }


   getSuggestions(keyword: string): Promise<Suggestion[]> {
    const url = `${this.endpoint}${'suggestions/'}${keyword}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Suggestion[])
      .catch(UtilsService.handleError);
  }
}
