import {Country} from '../../general/country';
import {City} from '../../general/city';
import {UserFile} from '../file/file';

export class UserOrCompany {
  id: number;
  name: string;
  image: UserFile;
  user: boolean;
  unreadCount: number;
  country_details: Country;
  city_details: City;
}
