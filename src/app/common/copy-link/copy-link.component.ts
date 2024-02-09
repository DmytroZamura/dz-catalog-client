import {Component, OnInit} from '@angular/core';
import {StandardMessageService} from '../../standard-message.service';

@Component({
  selector: 'app-copy-link',
  templateUrl: './copy-link.component.html',
  styleUrls: ['./copy-link.component.css']
})
export class CopyLinkComponent implements OnInit {

  link: string;
  showDialog = false;

  constructor(private messageService: StandardMessageService) {
  }

  ngOnInit() {
  }

  openDialog(link: string) {
    this.link = link;
    this.showDialog = true;
  }

  copyLink(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.showDialog = false;
    this.messageService.addMessage({
          severity: 'success',
          summary: 'Link',
          detail: 'Successfully copied'
        });
  }

}
