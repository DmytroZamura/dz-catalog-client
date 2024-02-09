import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SupplyRequestPosition} from '../../supply-request';
import {Currency} from '../../../general/currency';
import {Inplace} from 'primeng/inplace';
import {StandardMessageService} from '../../../standard-message.service';
import {GeneralService} from '../../../general/general.service';

@Component({
  selector: 'app-supply-request-position',
  templateUrl: './supply-request-position.component.html',
  styleUrls: ['./supply-request-position.component.css']
})
export class SupplyRequestPositionComponent implements OnInit {
  @Input() position: SupplyRequestPosition;
  @Input() currency: Currency;
  @Input() truncate = 60;
  @Input() editMode: boolean;
  @Input() updateMode = false;
  @Input() userType: string; // - supplier, customer
  @ViewChild('inplacePrice') inplacePriceComponent: Inplace;
  @ViewChild('inplaceQty') inplaceQtyComponent: Inplace;
  @Output() positionChanged = new EventEmitter<SupplyRequestPosition>();
  @Output() deleted = new EventEmitter<void>();
  readyToSave = false;
  price: number;
  quantity: number;
  total: number;
  inplaceActive = false;

  constructor(private service: GeneralService,
              private messageService: StandardMessageService) {
  }

  ngOnInit() {
    this.initInplaceValues();
  }


  deletePosition() {
    this.deleted.emit();
  }


  initInplaceValues() {
    this.price = this.position.price;
    this.quantity = this.position.quantity;
    this.total = this.position.total;
  }


  readyToSavePosition() {
    this.readyToSave = true;
    this.calculateTotalAmmount();
  }

  onInplaceActive() {
    if (this.inplacePriceComponent) {
      this.inplacePriceComponent.active = true;
    }
    if (this.inplaceQtyComponent) {
      this.inplaceQtyComponent.active = true;
    }
    this.inplaceActive = true;
  }

  closeInplace() {
    if (this.inplacePriceComponent) {
      this.inplacePriceComponent.active = false;
    }
    if (this.inplaceQtyComponent) {
      this.inplaceQtyComponent.active = false;
    }
    this.inplaceActive = false;
  }

  onCancel() {
    this.initInplaceValues();
    this.closeInplace();
  }

  onSave() {
    this.closeInplace();
    this.position.price = this.price;
    this.position.quantity = this.quantity;
    this.position.total = this.total;


    const url = `${'update-supply-request-position/'}${this.position.id}`;
    this.service.updateItem(url, this.position)
      .then(res => {
        this.position = res;
        if (this.updateMode) {

          this.messageService.addMessage({
            severity: 'success',
            summary: 'Record',
            detail: 'Successfully updated'
          });
        }

        this.positionChanged.emit(this.position);

      })
      .catch(error => {
        console.log(error);
      });


  }

  calculateTotalAmmount() {


    if (this.price && this.quantity) {


      this.total = this.quantity * this.price;


    } else {
      this.total = 0;
    }
  }


}
