import {Component, Input, OnInit} from '@angular/core';
import {PostOption} from '../../post';


@Component({
  selector: 'app-post-options',
  templateUrl: './post-options.component.html',
  styleUrls: ['./post-options.component.css']
})
export class PostOptionsComponent implements OnInit {
  @Input() options: PostOption[];

  constructor() {
  }

  ngOnInit() {
  }

  addOption() {
    if (!this.options) {
      this.options = [];
    }
    const option = new PostOption();
    option.position = this.options.length + 1;
    this.options.push(option);
  }



  deleteOption(index: number) {
    this.options.splice(index, 1);

  }

  getOptions(): PostOption[] {
    return this.options;
  }

}
