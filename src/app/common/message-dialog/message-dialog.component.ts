import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UserImage} from '../file/file';
import {TextEditorComponent} from '../text-editor/text-editor.component';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {
  @Input() header: string;
  @Input() label: string;
  @Input() submitButtonLabel: string;
  @Input() placeholder = '';
  @Output() canceled = new EventEmitter<void>();
  @Output() sendMessage = new EventEmitter<string>();
  @ViewChild('textEditor') textEditorComponent: TextEditorComponent;
  show_dialog = false;
  message = '';

  constructor(public app: AppComponent) {
  }

  ngOnInit() {
  }

  showDialog(message: string) {

    if (this.app.appService.isAuthenticated()) {

      this.message = message;
      this.show_dialog = true;
    } else {
      this.app.appService.showAuthDialog = true;
    }


  }

  onCancel() {
    this.message = '';
    this.show_dialog = false;

  }


  onSendMessage() {

    this.sendMessage.emit(this.message);
    this.show_dialog = false;

  }

  onFileUpload(event: UserImage) {
    this.textEditorComponent.addImage({title: event.name, url: event.file_url});

  }


  addEmoji(event: string) {

    this.textEditorComponent.addEmoji(event);


  }


  addGiphy(event) {

    this.textEditorComponent.addImage(event);

  }

  addSticker(event) {
    this.textEditorComponent.addSticker(event);
  }


}
