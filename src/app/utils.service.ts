import {Injectable} from '@angular/core';
import {UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {


  public static convertToServerDate(dateStr: string) {
    const date = new Date(Date.parse(dateStr));
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  public static handleError(error: any): Promise<any> {

    return Promise.reject(error.message || error);
  }

  public static toItemIndexes<T>(a: T[]) {
    return a.map((item, index) => ({item, index}));
  }

  public static getCurrentPrimeRout(urlTree: UrlTree): string {

    const primaryUrl = urlTree.root.children['primary'];
    let urlWithoutParams = '/';
    if (primaryUrl) {
      urlWithoutParams = primaryUrl.segments[0].path;
    }
    return urlWithoutParams;
  }

  public static addNowFollow(text: string) {
    return text.replace(/rel="noopener noreferrer"/g, 'rel="noopener noreferrer nofollow"');

  }

  constructor() {
  }


}
