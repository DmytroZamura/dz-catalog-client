import {Injectable} from '@angular/core';
import {AppConfig} from '../config/config.service';
import {HttpClient} from '@angular/common/http';
import {UtilsService} from '../utils.service';
import {Tag, TagFollower} from './tag';
import {CompanyFollower} from '../company/company';

@Injectable({
  providedIn: 'root'
})
export class TagService {
   endpoint = AppConfig.settings.endPointUrl;

  constructor(public http: HttpClient) {
  }

  getTagBySlug(slug: string): Promise<Tag> {
    const url = `${this.endpoint}${'tag-by-slug/'}${slug}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Tag)
      .catch(UtilsService.handleError);
  }



  followTag(object: TagFollower): Promise<TagFollower> {
    const url = `${this.endpoint}${'follow-tag/'}`;
    return this.http
      .post(url, JSON.stringify(object))
      .toPromise()
      .then(response => response as TagFollower)
      .catch(UtilsService.handleError);
  }

  unfollowTag(user: number, tag: number): Promise<void> {
    const url = `${this.endpoint}${'unfollow-tag/'}${tag}${'/'}`;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(UtilsService.handleError);
  }

}
