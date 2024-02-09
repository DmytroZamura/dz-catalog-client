import {Injectable} from '@angular/core';
import {AppConfig} from '../config/config.service';
import {HttpClient} from '@angular/common/http';
import {UtilsService} from '../utils.service';
import {Activity, AggregatedFeedItem} from '../post/post';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

   endpoint = AppConfig.settings.endPointUrl;

  constructor(public http: HttpClient) {
  }

  getNotificationsFeed(page: number, user: number): Promise<AggregatedFeedItem[]> {

    const url = `${this.endpoint}${'notifications-feed/'}${page}${'/?currentuser='}${user}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response as AggregatedFeedItem[])
      .catch(UtilsService.handleError);
  }


  setSeenProfileNotifications(): Promise<Boolean> {
    const url = `${this.endpoint}${'set-seen-profile-notifications/'}`;
    return this.http
      .put(url, JSON.stringify(true))
      .toPromise()
      .then(response => response as Boolean)
      .catch(UtilsService.handleError);
  }

  checkUserActions(): Promise<any> {
    const url = `${this.endpoint}${'check-user-actions/'}`;
    return this.http
      .put(url, JSON.stringify(true))
      .toPromise()
      .then(response => response as any)
      .catch(UtilsService.handleError);
  }


  enrichNotification(notification): Promise<Activity> {
    const url = `${this.endpoint}${'enrich-notification/'}`;
    return this.http
      .put(url, JSON.stringify(notification))
      .toPromise()
      .then(response => response as Activity)
      .catch(UtilsService.handleError);
  }


}
