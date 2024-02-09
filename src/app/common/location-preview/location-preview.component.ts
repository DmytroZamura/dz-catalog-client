import {Component, Input, OnInit} from '@angular/core';

import {Country} from '../../general/country';
import {City} from '../../general/city';

@Component({
  selector: 'app-location-preview',
  templateUrl: './location-preview.component.html',
  styleUrls: ['./location-preview.component.css']
})
export class LocationPreviewComponent implements OnInit {
  @Input() country: Country;
  @Input() city: City;
  @Input() flagOnly = false;

  constructor() {
  }

  ngOnInit() {
  }

}
