import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../config/config.service';
import {UtilsService} from '../utils.service';
import {Chat, Message} from './messaging';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

   endpoint = AppConfig.settings.endPointUrl;

  constructor(public http: HttpClient) {
  }


  createMessage(object: Message): Promise<Message> {
    const url = `${this.endpoint}${'create-message/'}`;
    return this.http
      .post(url, JSON.stringify(object))
      .toPromise()
      .then(response => response as Message)
      .catch(UtilsService.handleError);

  }

  editMessage(object: Message): Promise<Message> {
    const url = `${this.endpoint}${'edit-message/'}${object.id}${'/'}`;

    return this.http
      .put(url, JSON.stringify(object))
      .toPromise()
      .then(response => response as Message)
      .catch(UtilsService.handleError);
  }

  setReadMessagesForChatUser(chat: number): Promise<Boolean> {
    const url = `${this.endpoint}${'set-read-messages-for-chat-user/'}${chat}${'/'}`;
    return this.http
      .put(url, JSON.stringify(chat))
      .toPromise()
      .then(response => response as Boolean)
      .catch(UtilsService.handleError);
  }

  setReadMessagesForChatCompany(chat: number, company: number): Promise<Boolean> {
    const url = `${this.endpoint}${'set-read-messages-for-chat-company/'}${chat}${'/'}${company}${'/'}`;
    return this.http
      .put(url, JSON.stringify(chat))
      .toPromise()
      .then(response => response as boolean)
      .catch(UtilsService.handleError);
  }


  deleteMessage(pk: number): Promise<void> {
    const url = `${this.endpoint}${'delete-message/'}${pk}${'/'}$`;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(UtilsService.handleError);
  }


  getChats(page: number, filter: string): Promise<Chat[]> {
    const url = `${this.endpoint}${'get-chats/'}${page}${'/'}${filter}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Chat[])
      .catch(UtilsService.handleError);
  }




  getChatsCount(filter: string): Promise<any> {
    const url = `${this.endpoint}${'get-chats-count/'}${filter}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as any)
      .catch(UtilsService.handleError);

  }

  getYourParticipant(chat: number): Promise<any> {
    const url = `${this.endpoint}${'get-your-participant/'}${chat}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as any)
      .catch(UtilsService.handleError);

  }

   getMessagesCount(chat: number): Promise<any> {
    const url = `${this.endpoint}${'get-messages-count/'}${chat}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as any)
      .catch(UtilsService.handleError);

  }


  getChatIdForUserContact(user: number, contact): Promise<any> {
    const url = `${this.endpoint}${'get-chat-id-for-user-contact/'}${user}${'/'}${contact}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as any)
      .catch(UtilsService.handleError);
  }


  getMessages(chat: number, page: number): Promise<Message[]> {
    const url = `${this.endpoint}${'get-chat-messages-by-page/'}${chat}${'/'}${page}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Message[])
      .catch(UtilsService.handleError);
  }

  getMessage(pk: number): Promise<Message> {
    const url = `${this.endpoint}${'get-message/'}${pk}${'/'}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Message)
      .catch(UtilsService.handleError);
  }


}
