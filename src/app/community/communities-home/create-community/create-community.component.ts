import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Community} from '../../community';
import {Router} from '@angular/router';
import {StandardMessageService} from '../../../standard-message.service';
import {SelectLocationComponent} from '../../../general/select-location/select-location.component';
import {GLocation} from '../../../general/city';
import {GeneralService} from '../../../general/general.service';


@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.css']
})
export class CreateCommunityComponent implements OnInit {

  @Input() community: Community;
  @Input() user_id: number;
  @Output() cancel = new EventEmitter<boolean>();
  @Output() msgPushed = new EventEmitter<any>();
  @ViewChild('location') locationComponent: SelectLocationComponent;

  show_dialog = false;
  disabledSave = false;

  constructor(
              private service: GeneralService,
              private router: Router,
              private messageService: StandardMessageService) {
  }

  ngOnInit() {
  }


  newCommunity() {
    this.community = new Community();
    this.community.owner = this.user_id;
    this.community.language_code = 'en';
    this.community.open = true;
    this.show_dialog = true;
  }

  onLocalChange(event) {

    if (!event) {
      this.community.country = null;
      this.community.country_details = null;
      this.community.city = null;
      this.community.city_details = null;
    }


  }

  onLocationSelect(location: GLocation) {
    if (location) {
      if (location.country) {
        this.community.country = location.country.id;
      } else {
        this.community.country = null;
      }
      this.community.country_details = location.country;
      if (location.city) {
        this.community.city = location.city.id;
      } else {
        this.community.city = null;
      }
      this.community.city_details = location.city;


    }

  }


  onSave() {

    const checkLocation = this.locationComponent.checkLocationName();

    if (checkLocation) {
      this.disabledSave = true;
      const url = `${'create-community'}`;
      this.service.createItem(url, this.community)
       .then(res => {

          this.messageService.addMessage({
            severity: 'success',
            summary: 'Community',
            detail: 'Successfully created'
          });


          this.router.navigate(['/manage-community/' + res.id]);

        })
        .catch(error => {
          this.handleError(error);
        });


    }

  }


  onCancel() {
    this.show_dialog = false;
    this.cancel.emit(true);
  }

  onFileUpload(event) {
    this.community.image = event.id;
    this.community.image_details = event;

  }

  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);


  }

}
