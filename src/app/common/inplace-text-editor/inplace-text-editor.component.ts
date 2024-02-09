import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Inplace} from 'primeng/inplace';

@Component({
  selector: 'app-inplace-text-editor',
  templateUrl: './inplace-text-editor.component.html',
  styleUrls: ['./inplace-text-editor.component.css']
})
export class InplaceTextEditorComponent implements OnInit {

  @Input() text: string;
  @Input() placeholder: string;
  @Input() writePlaceholder: string;
  @Input() currentUserId: 0;
  @ViewChild('inplaceText') inplaceCommentText: Inplace;
  @Output() textChange = new EventEmitter<string>();
  readyToSave = false;

  constructor() {
  }

  ngOnInit() {
  }

  readySaveText() {
    this.readyToSave = true;
  }

  onCancel() {
    this.inplaceCommentText.active = false;
  }

  onSave() {

    this.inplaceCommentText.active = false;
    this.readyToSave = false;
    this.textChange.emit(this.text);

  }

}
