import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Mention} from '../mention';

import {PreviewOverlayPanelComponent} from '../../../preview-overlay-panel/preview-overlay-panel.component';
import {GeneralService} from '../../../../general/general.service';

@Component({
  selector: 'app-mention-preview',
  templateUrl: './mention-preview.component.html',
  styleUrls: ['./mention-preview.component.css']
})
export class MentionPreviewComponent implements OnInit {

  @Input() currentUserId: number;
  @ViewChild('previewpanel') previewPanelComponent: PreviewOverlayPanelComponent;

  mention: Mention;


  constructor( private service: GeneralService) {
  }

  ngOnInit() {
  }

  checkMention(event) {

    if (event.relatedTarget && event.target) {

      if (event.relatedTarget.className === 'mention' && event.target.className === 'mention-link') {
        const el = event.relatedTarget;
        const type = el.attributes[7];
        if (type) {

          if (type.value === 'company') {
            if (el.attributes[3]) {
              const id = el.attributes[3].value;
              this.showCompanyPreview(event, id);
            }
          }
          if (type.value === 'user') {
            if (el.attributes[3]) {
              const id = el.attributes[3].value;
              this.showUserPreview(event, id);
            }
          }
        }
      }
    }

  }


  showCompanyPreview(event, id: number) {
    const endpoint = `${'get-company-details-short/'}${id}`;
    this.service.getItem(endpoint).then(res => {

      const mention = new Mention();
      mention.company_details = res;
      this.mention = mention;
      this.previewPanelComponent.showCompanyPreview(event, res);

    })
      .catch(error => {
        console.log(error);
      });


  }


  showUserPreview(event, id: number) {

    const endpoint = `${'get-short-user-profile/'}${id}`;
    this.service.getItem(endpoint)
      .then(res => {
        const mention = new Mention();
        mention.profile_details = res;
        this.mention = mention;
        this.previewPanelComponent.showUserPreview(event, res);

      })
      .catch(error => {
        console.log(error);
      });


  }

}
