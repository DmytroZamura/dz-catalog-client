import { EventEmitter, Injectable, Output, Directive } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {StandardMessage} from './signal';



@Directive()
@Injectable({
  providedIn: 'root'
})
export class StandardMessageService {

  @Output() messageAdded: EventEmitter<StandardMessage> = new EventEmitter();

  constructor(private translate: TranslateService) {
  }

  addMessage(message: StandardMessage, translateDetail = true) {
    let summary = '';
    let detail = '';
    this.translate.get('ALERTS.' + message.summary).subscribe(res => {
      summary = res;

      if (translateDetail) {
        this.translate.get('ALERTS.' + message.detail).subscribe(det => {
          detail = det;
          this.messageAdded.emit({severity: message.severity, summary: summary, detail: detail});

        });
      } else {
        this.messageAdded.emit({severity: message.severity, summary: summary, detail: message.detail});
      }

    });
  }
}
