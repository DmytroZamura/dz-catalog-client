import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {GeneralService} from '../general.service';
import {ActivatedRoute} from '@angular/router';
import {Translation} from '../language';
import {StandardMessageService} from '../../standard-message.service';
import {MetaService} from '../../meta.service';
import {AppComponent} from '../../app.component';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-show-document',
  templateUrl: './show-document.component.html',
  styleUrls: ['./show-document.component.css']
})
export class ShowDocumentComponent implements OnInit {

  code: string;
  document: Translation;
  urlLanguage: string;
  language = 'en';
  isBrowser = false;

  constructor(private generalService: GeneralService, private activateRoute: ActivatedRoute,
              public app: AppComponent, @Inject(PLATFORM_ID) private platformId: any,
              private messageService: StandardMessageService, private metaService: MetaService) {
        this.isBrowser = isPlatformBrowser(this.platformId);

    this.code = activateRoute.snapshot.params['code'];
    const language = activateRoute.snapshot.params['language'];
    if (language) {

      this.language = this.metaService.checkLanguage(language);
    } else {
      this.app.appService.setLanguage();
    }

    if (language && (this.language === language)) {
      this.urlLanguage = language;
    }

  }

  ngOnInit() {
    this.activateRoute.params.subscribe(routeParams => {

        this.code = routeParams.code;
        this.getDocument();

    });


  }


  getDocument() {
    this.document = null;
    this.generalService.getTranslation(this.code)
      .then(res => {

          this.document = res;

          this.metaService.addMetaTags(this.code, this.code,
            this.urlLanguage, this.code, null, null, true, 'article', null);

        }
      )
      .catch(error => {
        this.handleError(error);
      });
  }

  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);

  }

}
