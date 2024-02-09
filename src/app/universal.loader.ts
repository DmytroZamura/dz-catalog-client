import {isPlatformServer} from '@angular/common';
import {makeStateKey, StateKey, TransferState} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';

import {TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {Observable} from 'rxjs';
// import 'rxjs/add/operator/map';

declare var require: any;
const fs = require('fs');


export function translateFactory(transferState: TransferState, http: HttpClient, plateformId: object) {
  return new TranslateUniversalLoader(isPlatformServer(plateformId), './static/assets/i18n14/', '.json', transferState, http);
}

export class TranslateUniversalLoader implements TranslateLoader {

  constructor(private isServer: boolean,
              private prefix: string = 'i18n14',
              private suffix: string = '.json',
              private transferState: TransferState,
              private http: HttpClient) {
  }

  public getTranslation(lang: string): Observable<any> {
    const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
    const data = this.transferState.get(key, null);

    if (!data && !this.isServer) {

      return new TranslateHttpLoader(this.http, this.prefix, this.suffix).getTranslation(lang);
    } else {
      return Observable.create(observer => {
        if (this.isServer) {
          const json = JSON.parse(fs.readFileSync(`dist/browser/static/assets/i18n14/${lang}.json`, 'utf8'));
          this.transferState.set(key, json);
        }

        observer.next(this.transferState.get(key, null));
        observer.complete();
      });
    }
  }
}
