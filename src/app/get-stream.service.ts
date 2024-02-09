import {Injectable} from '@angular/core';
import {AppConfig} from './config/config.service';
import {UtilsService} from './utils.service';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetStreamService {

   endpoint = AppConfig.settings.endPointUrl;
  //  app_key = AppConfig.settings.stream_app_key;
  //  app_id = AppConfig.settings.stream_app_id;

  constructor(public http: HttpClient) {
  }

  getUserToken(): Promise<any> {

    const url = `${this.endpoint}${'get-user-token/'}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response as any)
      .catch(UtilsService.handleError);

  }


}
