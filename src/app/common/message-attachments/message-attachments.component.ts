import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {OverlayPanel} from 'primeng/overlaypanel';

import {UserImage} from '../file/file';


@Component({
  selector: 'app-message-attachments',
  templateUrl: './message-attachments.component.html',
  styleUrls: ['./message-attachments.component.css']
})
export class MessageAttachmentsComponent implements OnInit {

  @Input() showImageButton = true;
  @Input() showEmojiButton = true;
  @Input() showGiphyButton = true;
  @Input() showGiphyStickersButton = true;
  showEmoji = false;


  showGiphySearch = false;
  showGiphyStickersSearch = false;
  @ViewChild('emojiPanel') emojiPanelComponent: OverlayPanel;
  @ViewChild('giphyPanel') giphyPanelComponent: OverlayPanel;
  @ViewChild('giphyStickersPanel') giphyStickersPanelComponent: OverlayPanel;

  @Output() selectImage = new EventEmitter<UserImage>();
  @Output() selectEmoji = new EventEmitter<string>();
  @Output() selectGiphy = new EventEmitter<any>();
  @Output() selectSticker = new EventEmitter<any>();


  constructor() {
  }

  ngOnInit() {

  }




  toggleGiphySearch(event) {
    // if (!this.showGiphySearch) {
    this.showGiphySearch = true;
    // }
    this.giphyPanelComponent.toggle(event);
    // this.showGiphySearch = !this.showGiphySearch;
  }


  toggleGiphyStickersSearch(event) {

    this.showGiphyStickersSearch = true;

    this.giphyStickersPanelComponent.toggle(event);

  }

  toggleEmojiPicker(event) {
    // this.showEmojiPicker = !this.showEmojiPicker;
    this.showEmoji = true;
    this.emojiPanelComponent.toggle(event);
  }

  addEmoji(event) {


    this.selectEmoji.emit(event.emoji.native);

    this.emojiPanelComponent.hide();

  }

  onFileUpload(image: UserImage) {

    this.selectImage.emit(image);
  }

  onGiphySelect(event) {
    this.giphyPanelComponent.hide();
    this.showGiphySearch = false;
    this.selectGiphy.emit(event);

  }

  onGiiphyHide() {
     this.showGiphySearch = false;
  }

  onStickerHide() {
    this.showGiphyStickersSearch = false;
  }

  onStickerSelect(event) {
    this.giphyStickersPanelComponent.hide();
    this.showGiphyStickersSearch = false;
    this.selectSticker.emit(event);

  }


}
