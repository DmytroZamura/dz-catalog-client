import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileShort} from '../profile';
import {GeneralService} from '../../general/general.service';

@Component({
  selector: 'app-select-profile',
  templateUrl: './select-profile.component.html',
  styleUrls: ['./select-profile.component.css']
})
export class SelectProfileComponent implements OnInit {
  filteredProfiles: ProfileShort[];
  @Input() profile: ProfileShort;
  @Input() label_text: string;
  @Input() disabled = false;
  @Input() requred = false;
  @Input() label = true;
  @Input() company: number;
  @Input() community: number;
  placeholder = '';

  @Output() porfileSelected = new EventEmitter<ProfileShort>();
  filter = '';

  constructor(private service: GeneralService) {
  }

  ngOnInit() {
    this.formFilter();
    if (!this.label) {
      this.placeholder = this.label_text;
    }
  }


  formFilter() {

    let filter_str = '?';
    if (this.company) {
      filter_str = filter_str + '&company=' + this.company;
    }

    if (this.community) {
      filter_str = filter_str + '&community=' + this.community;
    }

    this.filter = filter_str;


  }

  getFilteredProfiles(event): void {


    if (event.query) {
      const url = `${'search-profiles-by-name/'}${event.query}`;
      this.service.getItems(url, this.filter)
        .then(res => {
          this.filteredProfiles = res;
        })
        .catch(error => {
          console.log(error);
        });


    }

  }


  onProfileSelect(event) {

    this.profile = event;
    this.porfileSelected.emit(event);


  }


  onClear() {
    this.profile = null;

    // this.porfileSelected.emit(null);
  }


}

