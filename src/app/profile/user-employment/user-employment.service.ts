import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UtilsService} from '../../utils.service';
import {AppConfig} from '../../config/config.service';
import {UserProfileCategory, UserSettings} from '../profile';
import {UserEmployment} from './employment';

@Injectable({
  providedIn: 'root'
})
export class UserEmploymentService {

  endpoint = AppConfig.settings.endPointUrl;


  constructor(public http: HttpClient) {

  }


  createUserEmployment(object: UserEmployment): Promise<UserEmployment> {

    const url = `${this.endpoint}${'create-user-employment/'}`;
    return this.http
      .post(url, JSON.stringify(object))
      .toPromise()
      .then(response => response as UserEmployment)
      .catch(UtilsService.handleError);

  }

  deleteUserEmployment(pk: number): Promise<void> {
    const url = `${this.endpoint}${'delete-user-employment/'}${pk}${'/'}`;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(UtilsService.handleError);
  }


  getUserEmployment(pk: number): Promise<UserEmployment> {

    const url = `${this.endpoint}${'get-user-employment-details/'}${pk}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as UserEmployment)
      .catch(UtilsService.handleError);
  }


  updateUserEmployment(object: UserEmployment): Promise<UserEmployment> {
    const url = `${this.endpoint}${'update-user-employment/'}${object.id}${'/'}`;
    return this.http
      .put(url, JSON.stringify(object))
      .toPromise()
      .then(response => response as UserEmployment)
      .catch(UtilsService.handleError);
  }

  updateUserEmploymentInLanguage(object: UserEmployment): Promise<UserEmployment> {
    const url = `${this.endpoint}${'update-user-employment-in-language/'}${object.id}${'/'}`;
    return this.http
      .put(url, JSON.stringify(object))
      .toPromise()
      .then(response => response as UserEmployment)
      .catch(UtilsService.handleError);
  }

  getUserEmployments(profile: number, education: boolean, language: string): Promise<UserEmployment[]> {

    const url = `${this.endpoint}${'get-user-employments/'}${profile}${'/'}${education}${'/'}${language}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as UserEmployment[])
      .catch(UtilsService.handleError);
  }

}
