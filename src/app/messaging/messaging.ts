import {UserWithProfile} from '../profile/profile';
import {CompanyShort} from '../company/company';


export class Chat {
  id: number;
  type: number;
  // post: number;
  // supply_request: number;
  unread_messages: number;
  update_date: string;
  participants: ChatParticipant[];
  ui_state = '';
}

export class ChatParticipant {
  id: number;
  chat: number;
  user: number;
  user_details: UserWithProfile;
  company: number;
  company_details: CompanyShort;
  company_default_details: CompanyShort;
  unread_messages: number;
  update_date: string;
  supplier: boolean;
  customer: boolean;
}

export class Message {
  id: number;
  chat: number;
  type: number;
  user: number;
  user_details: UserWithProfile;
  company: number;
  company_details: CompanyShort;
  company_default_details: CompanyShort;
  message: string;
  update_date: string;
}

export class MessagesDefer {
  show = false;
}

