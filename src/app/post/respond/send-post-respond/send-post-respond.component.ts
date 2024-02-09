import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AppConfig} from '../../../config/config.service';
import {Profile, UserWithProfile} from '../../../profile/profile';

import {AppComponent} from '../../../app.component';

import {PostRespond} from '../post-respond';
import {Post} from '../../post';
import {Resume} from '../../../profile/resume';
import {AttachedDocument} from '../../../common/attached-documents/attached-document';
import {ProcessDialogComponent} from '../../../common/process-dialog/process-dialog.component';
import {StandardMessageService} from '../../../standard-message.service';
import {SignalService} from '../../../signal.service';
import {GeneralService} from '../../../general/general.service';


@Component({
  selector: 'app-send-post-respond',
  templateUrl: './send-post-respond.component.html',
  styleUrls: ['./send-post-respond.component.css']
})
export class SendPostRespondComponent implements OnInit {

  @Input() company: number;


  @Output() responded = new EventEmitter<any>();
  @Output() canceled = new EventEmitter<void>();
  @ViewChild('processDialog') processDialogComponent: ProcessDialogComponent;
   statusId = AppConfig.settings.newRespondStatus;
  postType = '';
  profile: Profile;
  respond: PostRespond;
  show_dialog = false;
  coverLetter: string;
  userDetails: UserWithProfile;
  disabled_save = true;
  index: number;
  feedType: number; // -- 1 - activity, 2 - filter
  disabledSelectUserOrCompany = false;
  resumeChecked = false;

  resumeRequred = false;
  selectedResume: Resume;

  constructor(public app: AppComponent,  private service: GeneralService,
              private messageService: StandardMessageService, private signalService: SignalService) {
  }


  ngOnInit() {
    if (this.company) {
      this.disabledSelectUserOrCompany = true;
    }
    this.initCurrentUserProfile();

  }

  initCurrentUserProfile() {
    if (this.app.appService.userProfile) {
      this.userDetails = new UserWithProfile();
      this.userDetails.user_profile = this.app.appService.userProfile;
      this.userDetails.user_profile_default = this.app.appService.userProfile;
    }
  }

  onSelectedRole(event) {

    if (!event.user) {
      this.company = event.id;

    } else {
      this.company = null;

    }


  }

  initRespond(post: Post) {

    this.postType = post.type_details.code;
    if (this.postType !== 'job') {
      this.disabled_save = false;
    } else {
      if (post.post_job) {

        this.resumeRequred = post.post_job.resume_required;
        this.disabled_save = this.resumeRequred && !this.selectedResume;

      } else {
        this.disabled_save = false;
        this.resumeRequred = false;
      }
    }

    if (this.userDetails) {

      this.respond = new PostRespond();
      this.respond.post = post.id;
      this.respond.skype = this.app.appService.userProfile.skype;
      this.respond.contact_email = this.app.appService.userProfile.contact_email;
      this.respond.contact_phone = this.app.appService.userProfile.contact_phone;

      this.respond.user = this.app.appService.userProfile.user_id;
      this.respond.status = this.statusId;


      if (this.postType === 'offering' && post.post_offering) {
        this.respond.currency = post.post_offering.price_currency;
        this.respond.currency_details = post.post_offering.price_currency_details;
        this.respond.proposed_price = post.post_offering.price;
      }

      if (this.postType === 'request' && post.post_request) {
        this.respond.currency = post.post_request.price_currency;
        this.respond.currency_details = post.post_request.price_currency_details;

      }


    }
  }

  showDialog(post: Post, index: number, feedType: number) {

    this.initCurrentUserProfile();
    this.postType = post.type_details.code;

    this.initRespond(post);
    if (this.userDetails) {


      this.index = index;
      this.feedType = feedType;


      this.show_dialog = true;


    }
  }

  onCancel() {

    this.show_dialog = false;
    this.respond = null;

  }

  onResumeSelected(resume: Resume) {

    this.selectedResume = resume;
    if (this.resumeRequred) {

      this.disabled_save = !this.selectedResume;

    }

    this.resumeChecked = true;

  }

  onSendRespond() {
    this.respond.company = this.company;

    this.processDialogComponent.show();
    if (this.postType === 'job') {
      if (this.selectedResume || !this.resumeRequred) {

        if (this.selectedResume) {
          this.respond.resume = this.selectedResume.file;
        }
      }

       const url = `${'create-application'}`;

      this.service.createItem(url, this.respond)
      .then(res => {
          this.app.newTimestamp();
          this.processDialogComponent.close();
          this.responded.emit({'respond': res, 'postIndex': this.index, 'feedType': this.feedType, 'postType': this.postType});
          this.signalService.createYourPostRespond(res);

           this.messageService.addMessage({
              severity: 'success',
              summary: 'Status',
              detail: 'Successfully responded'
            });
          this.show_dialog = false;
        })
        .catch(error => {
          console.log(error);
          this.processDialogComponent.close();
        });


    } else {

      const url = `${'create-post-respond'}`;
      this.service.createItem(url, this.respond)
      .then(res => {
          this.app.newTimestamp();
          this.processDialogComponent.close();
          this.responded.emit({'respond': res, 'postIndex': this.index, 'feedType': this.feedType, 'postType': this.postType});
          this.signalService.createYourPostRespond(res);
           this.messageService.addMessage({
              severity: 'success',
              summary: 'Status',
              detail: 'Successfully responded'
            });
          this.show_dialog = false;
        })
        .catch(error => {
          console.log(error);
          this.processDialogComponent.close();
        });



    }


  }

  onCurrencyChange(event) {

    this.respond.currency_details = event;
    this.respond.currency = event.id;


  }

  onDocumentsChanged(documents: AttachedDocument[]) {
    this.respond.documents = documents;
  }



}
