import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {AppConfig} from './config/config.service';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {LanguageService} from './general/language.service';
import {UniversalFilter} from './common/universal-filter';
import {AppFilterService} from './app-filter.service';

import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Language} from './general/language';


@Injectable({
  providedIn: 'root'
})
export class MetaService {

  rootUrl = AppConfig.settings.redirectUri;
  languages = AppConfig.settings.languages;
  defaultLanguage = AppConfig.settings.defaultLanguage;
  isBrowser = false;

  private static checkKeyStrSeparator(keyStr: string): string {

    if (keyStr.length > 0) {
      keyStr = keyStr + ', ';
    }

    return keyStr;
  }

  private static formFilterKeyWords(filter: UniversalFilter): string {

    let keyStr = '';
    if (filter.post_type) {
      keyStr = MetaService.checkKeyStrSeparator(keyStr);
      keyStr = keyStr + filter.post_type.name_plural;
    }
    if (filter.category) {
      keyStr = MetaService.checkKeyStrSeparator(keyStr);
      keyStr = keyStr + filter.category.name;
    }


    if (filter.company_industry) {
      keyStr = MetaService.checkKeyStrSeparator(keyStr);
      keyStr = keyStr + filter.company_industry.name;
    }

    if (filter.company_type) {
      keyStr = MetaService.checkKeyStrSeparator(keyStr);
      keyStr = keyStr + filter.company_type.name;
    }

    if (filter.company_size) {
      keyStr = MetaService.checkKeyStrSeparator(keyStr);
      keyStr = keyStr + filter.company_size.name;
    }

    if (filter.job_function) {
      keyStr = MetaService.checkKeyStrSeparator(keyStr);
      keyStr = keyStr + filter.job_function.name;
    }

    if (filter.seniority_label) {
      keyStr = MetaService.checkKeyStrSeparator(keyStr);
      keyStr = keyStr + filter.seniority_label.name;
    }

    if (filter.job_type) {
      keyStr = MetaService.checkKeyStrSeparator(keyStr);
      keyStr = keyStr + filter.job_type.name;
    }

    if (filter.city) {
      keyStr = MetaService.checkKeyStrSeparator(keyStr);
      keyStr = keyStr + filter.city.name;
    }

    if (filter.country) {
      keyStr = MetaService.checkKeyStrSeparator(keyStr);
      keyStr = keyStr + filter.country.name;
    }

    return keyStr;

  }

  constructor(private title: Title,
              private meta: Meta, private translate: TranslateService, @Inject(PLATFORM_ID) private platformId: Object, @Inject(DOCUMENT) private dom,
              private languageService: LanguageService, @Inject(LOCAL_STORAGE) private localStorage: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  checkLanguage(language: string): string {
    const userId = +this.localStorage.getItem('user_id');

    if (!this.isBrowser && !language && !userId) {
      language = this.defaultLanguage;
    }

    language = this.languageService.checkLanguage(language);
    if (!userId) {
      this.languageService.changeToLocale(language, true);
    } else {
      this.languageService.setLanguage();
    }


    return language;

  }


  addMetaTags(rootPath: string, slug: string, language: string, name: string, description: string, image: string,
              serverMeta = true, ogType: string, filter: UniversalFilter, xDefault = true, languages: Language[] = [],
              createAlternateLanguages = true, link_canonical = '') {

    if (this.languageService.lang) {
      let keyStr = '';

      if (filter) {
        keyStr = MetaService.formFilterKeyWords(filter);
      }

      if (rootPath !== '/') {

        const titleTr = `${'META.'}${rootPath}${'.title'}`;

        this.translate.get(titleTr).subscribe(res => {
          let metaTitle = res;
          if (name) {
            if (rootPath === 'hashtag' || rootPath === 'keyword') {
              name = decodeURI(name);
            }
            metaTitle = metaTitle.replace('NAME', name);
          }

          if (filter && keyStr) {
            metaTitle = keyStr + ' - ' + metaTitle;
          }

          this.title.setTitle(metaTitle);

          this.meta.updateTag({property: 'og:title', content: metaTitle});
          this.meta.updateTag({name: 'twitter:title', content: metaTitle});

        });
      }

      if (!this.isBrowser && serverMeta) {

        let metaDescription = '';

        if (description) {
          if (description.length > 350) {
            metaDescription = description.substr(0, 350);

          } else {
            metaDescription = description;
          }
          this.createDescription(metaDescription);
        } else {
          const descriptionTr = `${'META.'}${rootPath}${'.description'}`;

          this.translate.get(descriptionTr).subscribe(res => {

            metaDescription = res;

            if (filter && keyStr) {
              metaDescription = keyStr + '. ' + metaDescription;
            }
            if (name) {
              metaDescription = metaDescription.replace('NAME', name);
            }


            this.createDescription(metaDescription);

          });

        }


        if (image) {
          this.meta.updateTag({property: 'og:image', content: image});
          this.meta.updateTag({name: 'twitter:image', content: image});
        }

        if (ogType) {
          this.meta.updateTag({property: 'og:type', content: ogType});

        }


        let ogUrl = `${this.rootUrl}${'/'}${rootPath}`;
        if (slug) {
          if (rootPath === 'hashtag' || rootPath === 'keyword') {
            slug = decodeURI(slug);
          }
          ogUrl = `${ogUrl}${'/'}${slug}`;
        }


        let paramsStr = '';
        if (filter) {
          paramsStr = AppFilterService.formParamsString(filter);
        }


        if (xDefault) {
          const xUrl = `${ogUrl}${'/en'}${paramsStr}`;

          this.createAlternateURL(xUrl, 'x-default');
        }

        if (createAlternateLanguages) {

          if (languages[0]) {
            for (const lang of languages) {
              const altUrl = `${ogUrl}${'/'}${lang.code}${paramsStr}`;


              this.createAlternateURL(altUrl, lang.code);
            }
          } else {

            for (const lang of this.languages) {
              const altUrl = `${ogUrl}${'/'}${lang}${paramsStr}`;

              this.createAlternateURL(altUrl, lang);
            }
          }
        }

        if (!language) {
          language = 'en';
        }
        ogUrl = `${ogUrl}${'/'}${language}`;
        this.dom.documentElement.lang = language;
        ogUrl = ogUrl + paramsStr;

        this.meta.updateTag({property: 'og:url', content: ogUrl});
        this.meta.updateTag({name: 'twitter:url', content: ogUrl});

        if (link_canonical) {
          this.createCanonicalURL(link_canonical);
        } else {
          this.createCanonicalURL(ogUrl);
        }

      }
    }
  }

  createDescription(description: string) {

    this.meta.updateTag({name: 'description', content: description});
    this.meta.updateTag({property: 'og:description', content: description});
    this.meta.updateTag({name: 'twitter:description', content: description});

  }

  createCanonicalURL(url?: string) {
    const canURL = url === undefined ? this.dom.URL : url;
    const link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', canURL);
  }

  createAlternateURL(url: string, lang: string) {
    const link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'alternate');
    this.dom.head.appendChild(link);
    link.setAttribute('hreflang', lang);
    link.setAttribute('href', url);
  }

}
