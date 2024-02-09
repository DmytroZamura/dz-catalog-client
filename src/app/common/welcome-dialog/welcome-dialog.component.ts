import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.css']
})
export class WelcomeDialogComponent implements OnInit {

  @Output() startTour = new EventEmitter<any>();

  constructor(public appService: AppService) {
  }


  ngOnInit(): void {
  }

  onStartTour(event) {
    this.appService.showWelcomeDialog = false;
    this.startTour.emit(event);

  }

}
