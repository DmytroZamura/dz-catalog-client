import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileShort} from '../profile';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @Input() company: number;
  @Input() community: number;
  @Input() header: string;
  @Input() label: string;
  @Input() submitButtonLabel: string;
  @Input() width = 600;
  @Output() canceled = new EventEmitter<void>();
  @Output() profileAdded = new EventEmitter<ProfileShort>();
  show_dialog = false;
  selectedProfile: ProfileShort;


  constructor() {
  }

  ngOnInit() {
  }

  showDialog() {

    this.show_dialog = true;
    this.selectedProfile = null;

  }

  onCancel() {
    this.selectedProfile = null;
    this.show_dialog = false;

  }

  onProfileSelected(event) {

    this.selectedProfile = event;

  }

  onAddProfile() {

    this.profileAdded.emit(this.selectedProfile);
    this.show_dialog = false;

  }
}
