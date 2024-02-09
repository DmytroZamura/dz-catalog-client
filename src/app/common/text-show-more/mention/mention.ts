import {CompanyShort} from '../../../company/company';
import {ProfileShort} from '../../../profile/profile';

export class Mention {

  company_details: CompanyShort;
  profile_details: ProfileShort;

}


export class MentionSearch {

  id: number;
  name: string;
  image: string;
  slug: string;
  type: string;
}
