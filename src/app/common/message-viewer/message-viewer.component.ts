import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-message-viewer',
  templateUrl: './message-viewer.component.html',
  styleUrls: ['./message-viewer.component.css']
})
export class MessageViewerComponent implements OnInit {
  @Input() text: string;
  @Input() size = 'meduim'; // small, meduim, large


  constructor() {


  }

  ngOnInit() {


  }

}
