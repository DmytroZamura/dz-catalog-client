import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SupplyRequestPosition} from '../supply-request';
import {Currency} from '../../general/currency';
import {StandardMessageService} from '../../standard-message.service';
import {GeneralService} from '../../general/general.service';

@Component({
  selector: 'app-supply-request-positions',
  templateUrl: './supply-request-positions.component.html',
  styleUrls: ['./supply-request-positions.component.css']
})
export class SupplyRequestPositionsComponent implements OnInit {
  @Input() positions: SupplyRequestPosition[];
  @Input() currency: Currency;
  @Input() editMode: boolean;
  @Input() updateMode = false;
  @Input() userType: string; // - supplier, customer
  @Output() deleted = new EventEmitter<void>();
  @Output() positionsChanged = new EventEmitter<SupplyRequestPosition[]>();

  constructor( private service: GeneralService,
              private messageService: StandardMessageService) {
  }

  ngOnInit() {
  }

  onPositionChanged(position: SupplyRequestPosition, index: number) {
    // if (!this.updateMode) {
    this.positions[index] = position;
    this.positionsChanged.emit(this.positions);
    // }
  }

  setEditMode(mode: boolean) {
    this.editMode = mode;
  }

  onPositionDelete(index: number) {

    const url = `${'delete-supply-request-position/'}`;
    this.service.deleteItemByPk(url, this.positions[index].id)
      .then(() => {
        this.positions.splice(index, 1);

        this.deleted.emit();
        this.messageService.addMessage({
          severity: 'success',
          summary: 'Record',
          detail: 'Successfully deleted'
        });


      })
      .catch(error => {
        console.log(error);
      });


  }


}
