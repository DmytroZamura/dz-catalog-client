import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';


import {Config} from './app-config.model';



@Injectable()
export class AppConfig {

  static settings: Config;

  static load() {



    AppConfig.settings = environment.config;

  }
  constructor() {

  }




}
