import {UserFile} from '../common/file/file';
import {Country, Region} from './country';

export class City {
  id: number;
  name: string;
  slug: string;
  country: number;
  country_details: Country;
  region: number;
  region_details: Region;
  emblem_url: UserFile;
  emblem: number;
  head_photo_url: UserFile;
  head_photo: number;

}


export class GLocation {
  country: Country;
  region: Region;
  city: City;

}

