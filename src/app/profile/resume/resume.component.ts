import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Resume} from '../resume';

import {StandardMessageService} from '../../standard-message.service';
import {GeneralService} from '../../general/general.service';


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  @Input() resumes: Resume[];
  @Input() profile: number;
  @Input() selectMode = false;
  @Output() resumeSelected = new EventEmitter<Resume>();
  selectedResume: Resume;
  selectedIndex: number;
  loading = false;

  constructor( private service: GeneralService, private messageService: StandardMessageService) {
  }

  ngOnInit() {
    if (!this.resumes) {
      this.getResume();
    } else {
      this.selectResume(0);
    }
  }

  selectResume(index: number) {
    if (this.selectMode) {
      if (this.resumes[index]) {
        this.selectedResume = this.resumes[index];
        this.selectedIndex = index;

      } else {
        this.selectedResume = null;
        this.selectedIndex = null;
      }
      this.resumeSelected.emit(this.selectedResume);
    }
  }

  selectIndex(index: number) {
    this.selectedIndex = index;
    this.resumeSelected.emit(this.selectedResume);
  }


  getResume(): void {
    this.loading = true;

    const url = `${'profile-resumes'}`;
    this.service.getItems(url)
    .then(res => {
        this.resumes = res;
        this.selectResume(0);
        this.loading = false;

      })
      .catch(error => {
        this.loading = false;
        console.log(error);
      });




  }

  onResumeFileUpload(event) {
    const resume = new Resume();
    resume.file = event.id;
    resume.file_details = event;
    resume.show_in_profile = false;
    resume.profile = this.profile;
    if (!this.resumes) {
      this.resumes = [];
    }


    const url = `${'create-resume'}`;
    this.service.createItem(url, resume)
      .then(res => {
        this.resumes.push(res);
        this.loading = false;
        this.selectResume(this.resumes.length - 1);
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Resume',
          detail: 'Successfully uploaded'
        });


      })
      .catch(error => {
        console.log(error);
      });


  }

  downloadResume() {
    if (this.selectedResume) {
      window.open(this.selectedResume.file_details.file_url, '_self');
    }
  }

  deleteResume() {


    if (this.selectedResume) {
      const url = `${'delete-resume/'}`;
      this.service.deleteItemByPk(url, this.selectedResume.id)
        .then(res => {
          this.resumes.splice(this.selectedIndex, 1);
          this.selectedResume = null;
          this.selectedIndex = null;
          this.selectResume(0);
          this.messageService.addMessage({
            severity: 'success',
            summary: 'Resume',
            detail: 'Successfully deleted'
          });

        })
        .catch(error => {
          console.log(error);
        });


    }


  }

  onStartUploading() {
    this.loading = true;
  }

  onStopUploading() {
    this.loading = false;
  }

  setPublicStatus(status: boolean, index: number) {

    let resume_status = 0;
    if (status) {
      resume_status = 1;
    }

    const url = `${'set-resume-public-status/'}${this.resumes[index].id}${'/'}${resume_status}`;
    this.service.updateItem(url, {value: status})
      .then(res => {

        this.messageService.addMessage({
          severity: 'success',
          summary: 'Status',
          detail: 'Successfully updated'
        });


      })
      .catch(error => {
        console.log(error);
      });


  }




}
