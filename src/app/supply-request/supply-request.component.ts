import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SupplyRequest, SupplyRequestDocument, SupplyRequestPosition} from './supply-request';
import {AttachedDocument} from '../common/attached-documents/attached-document';
import {ProcessDialogComponent} from '../common/process-dialog/process-dialog.component';
import {StandardMessageService} from '../standard-message.service';

import {GeneralService} from '../general/general.service';


@Component({
  selector: 'app-supply-request',
  templateUrl: './supply-request.component.html',
  styleUrls: ['./supply-request.component.css']
})
export class SupplyRequestComponent implements OnInit {
  @Input() supply_request_id: number;
  @Output() msgPushed = new EventEmitter<any>();
  @Output() createdSupplyRequest = new EventEmitter<number>();
  @Output() updatedSupplyRequest = new EventEmitter<number>();
  @Output() deletedSupplyRequest = new EventEmitter<void>();
  @Output() canceledSupplyRequest = new EventEmitter<void>();
  @ViewChild('processDialog') processDialogComponent: ProcessDialogComponent;
  showDialog = false;

  supplyRequest: SupplyRequest;


  constructor(private service: GeneralService,
              private messageService: StandardMessageService) {
  }

  ngOnInit() {

    if (this.supply_request_id) {
      this.getSupplyRequest();
    }
  }

  initSupplyRequest(request: number) {
    this.supply_request_id = request;
    this.getSupplyRequest();
  }

  getSupplyRequest() {
    const url = `${'get-supply-request/'}${this.supply_request_id}`;
    this.service.getItem(url)
    .then(res => {

        this.supplyRequest = res;

      })
      .catch(error => {
        this.handleError(error);
      });

  }

  newSupplyRequest(request: SupplyRequest) {
    this.processDialogComponent.show();
       const url = `${'new-supply-request'}`;
       this.service.createItem(url, request)
    .then(res => {
        this.processDialogComponent.close();
        this.supplyRequest = res;
        this.showDialog = true;

      })
      .catch(error => {
        this.handleError(error);
      });




  }

  saveSupplyRequest() {
    this.processDialogComponent.show();

    if (this.supplyRequest.id) {
      this.updateSupplyRequest();
    } else {
      this.createSupplyRequest();
    }

  }

  calculateTotalAmount() {

    let totalAmount = 0;
    if (this.supplyRequest.charges) {
      totalAmount = this.supplyRequest.charges;
    }

    if (this.supplyRequest.positions) {

      for (const position of this.supplyRequest.positions) {

        if (position.price > 0) {
          totalAmount = totalAmount + position.quantity * position.price;
        }

      }

      this.supplyRequest.total_amount = totalAmount;
    }
    this.supplyRequest.total_amount = totalAmount;

  }


  createSupplyRequest() {
 const url = `${'create-supply-request'}`;
 this.service.createItem(url, this.supplyRequest)
     .then(res => {
        this.processDialogComponent.close();
        this.supplyRequest = res;
        this.showDialog = false;

        this.messageService.addMessage({
          severity: 'success',
          summary: 'Request',
          detail: 'Successfully created'
        });

        this.createdSupplyRequest.emit(res.id);

      })
      .catch(error => {
        this.handleError(error);
      });




  }

  updateSupplyRequest() {

    const url = `${'update-supply-request/'}${this.supplyRequest.id}`;
    this.service.updateItem(url, this.supplyRequest)
    .then(res => {
      const url1 = `${'update-supply-request-status-by-customer/'}${this.supplyRequest.id}`;

      this.service.updateItem(url1, {'value': 'posted'})
      .then(res1 => {
            this.processDialogComponent.close();
            this.supplyRequest = res;
            this.messageService.addMessage({
              severity: 'success',
              summary: 'Request',
              detail: 'Successfully sent'
            });
            this.showDialog = false;
            this.updatedSupplyRequest.emit(res.id);

          })
          .catch(error => {
            console.log(error);
          });




      })
      .catch(error => {
        this.handleError(error);
      });



  }


  deleteSupplyRequest() {

     const url = `${'delete-supply-request/'}`;
     this.service.deleteItemByPk(url, this.supplyRequest.id)
    .then(res => {

        this.messageService.addMessage({
          severity: 'success',
          summary: 'Request',
          detail: 'Successfully deleted'
        });

        this.deletedSupplyRequest.emit();
      })
      .catch(error => {
        this.handleError(error);
      });



  }

  onPostionsChanged(positions: SupplyRequestPosition[]) {

    this.supplyRequest.positions = positions;
    this.calculateTotalAmount();

  }


  onDocumentsChanged(documents: AttachedDocument[]) {
    this.supplyRequest.documents = documents;
  }


  onFileUpload(event) {
    const document = new SupplyRequestDocument();
    document.file = event.id;
    document.file_details = event;
    if (!this.supplyRequest.documents) {
      this.supplyRequest.documents = [];
    }

    this.supplyRequest.documents.push(document);


  }

  deleteDocument(index) {
    this.supplyRequest.documents.splice(index, 1);
  }

  onRoleSelect(event) {

    if (event.user) {
      this.supplyRequest.customer_user = event.id;
      this.supplyRequest.customer_company = null;
      this.supplyRequest.customer_company_details = null;
    } else {
      this.supplyRequest.customer_company = event.id;

      this.supplyRequest.customer_user = null;
      this.supplyRequest.customer_user_details = null;
    }


  }


  onCancel() {
    this.showDialog = false;
  }


  private handleError(error: any): void {

    this.messageService.addMessage({severity: 'error', summary: 'An error occurred', detail: error}, false);

  }

}
