import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AttachedDocument} from './attached-document';

@Component({
  selector: 'app-attached-documents',
  templateUrl: './attached-documents.component.html',
  styleUrls: ['./attached-documents.component.css']
})
export class AttachedDocumentsComponent implements OnInit {
  @Input() documents: AttachedDocument[];
  @Input() editMode = false;
  @Output() documentsChanged = new EventEmitter<AttachedDocument[]>();

  constructor() {
  }

  ngOnInit() {
  }

  onDocumentFileUpload(event) {
    const document = new AttachedDocument();
    document.file = event.id;
    document.file_details = event;
    if (!this.documents) {
      this.documents = [];
    }

    this.documents.push(document);

    this.documentsChanged.emit(this.documents);


  }

  deleteDocument(index) {

    this.documents.splice(index, 1);
    this.documentsChanged.emit(this.documents);

  }

}
