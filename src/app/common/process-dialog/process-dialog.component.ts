import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-process-dialog',
  templateUrl: './process-dialog.component.html',
  styleUrls: ['./process-dialog.component.css']
})
export class ProcessDialogComponent implements OnInit {
  @Input() header: string;
  @Input() processName: string;
  @Input() processComment: string;
  showDialog = false;

  constructor() {
  }

  ngOnInit() {
  }

  show() {

    this.showDialog = true;
  }

  close() {

    this.showDialog = false;
  }

}
