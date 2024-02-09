import {UserWithProfile} from '../../profile/profile';
import {CompanyShort} from '../../company/company';

import {CommonItem} from '../../general/common-item';
import {UserFile} from '../../common/file/file';
import {Currency} from '../../general/currency';
import { PostShort} from '../post';
import {Chat} from '../../messaging/messaging';
import {AttachedDocument} from '../../common/attached-documents/attached-document';

export class PostRespond {
  id: number;
  user: number;
  post: number;
  post_details: PostShort;
  user_details: UserWithProfile;
  company: number;
  company_details: CompanyShort;
  company_default_details: CompanyShort;
  chat: number;
  chat_details: PostRespondChat;
  status: number;
  status_details: CommonItem;
  documents: AttachedDocument[];
  create_date: string;
  update_date: string;
  resume: number;
  resume_details: UserFile;
  proposed_price: number;
  currency: number;
  currency_details: Currency;
  contact_email: string;
  contact_phone: string;
  skype: string;
  reviewed: boolean;
  cover_letter: string;
  comment: string;
  rating: number;
}


export class PostRespondChat {
  respond: number;
  applicant: number;
  chat: number;
  chat_details: Chat;

}
