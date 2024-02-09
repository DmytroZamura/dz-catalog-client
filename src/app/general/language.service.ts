import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Injectable, Inject} from '@angular/core';
import {AppConfig} from '../config/config.service';
import {TranslateService} from '@ngx-translate/core';
import {BrowserService} from '../browser.service';

import {SignalService} from '../signal.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  isBrowser = false;
  languages = AppConfig.settings.languages;
  defaultLanguage = AppConfig.settings.defaultLanguage;

  lang: string;


  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private translate: TranslateService, private browserService: BrowserService,
              private signalService: SignalService) {
    this.isBrowser = browserService.isBrowser;
  }


  public setLocale(locale: string, refreshInterface = false) {
    if (locale !== this.translate.currentLang) {

      let uiLocale = locale;

      if (!uiLocale) {
        if (this.isBrowser) {
          uiLocale = this.translate.getBrowserLang();
          if (uiLocale === 'ru') {
            uiLocale = 'uk';
          }
        } else {
          uiLocale = this.defaultLanguage;
        }
      }

      this.changeToLocale(uiLocale);


      if (refreshInterface) {

        this.signalService.refreshInterfaceLanguage(uiLocale);
      }

    }
  }


  getCurrentLang(): string {
    return this.translate.currentLang;
  }

  public checkLanguage(lang: string): string {
    let language = lang;
    if (lang) {
      language = lang;
    } else {
      lang = this.translate.currentLang;
      if (lang) {
        language = lang;
      } else {
        language = this.defaultLanguage;
      }
    }

    if (this.languages.indexOf(language) >= 0) {
      return language;
    } else {
      return this.defaultLanguage;
    }

  }

  setLanguage() {


    if (this.isBrowser) {
      const locale = localStorage.getItem('language_code');
      this.setLocale(locale, true);
    }


  }

  public changeToLocale(locale: string, refreshInterface = false) {

    if (!locale) {
      locale = this.defaultLanguage;
    }


    if (locale !== this.translate.currentLang) {
      if (this.languages.indexOf(locale) >= 0) {
        this.translate.setDefaultLang(locale);
        this.translate.use(locale);

        this.setLocalStorageLanguage(locale);


      } else {
        this.translate.setDefaultLang(this.defaultLanguage);
        this.translate.use(this.defaultLanguage);
        this.setLocalStorageLanguage(this.defaultLanguage);


      }

      if (refreshInterface) {

        this.signalService.refreshInterfaceLanguage(locale);
      }

    }
  }

  private setLocalStorageLanguage(locale: string) {
    if (this.isBrowser) {
      this.localStorage.setItem('language_code', locale);
    }


    this.lang = locale;

  }


  public initLanguages() {

    this.translate.addLangs(this.languages);
    // this.translate.setDefaultLang(this.defaultLanguage);
  }
}
