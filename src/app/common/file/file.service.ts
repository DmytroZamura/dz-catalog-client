import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../config/config.service';
import {UserFile, UserImage} from './file';
import {UtilsService} from '../../utils.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

   endpoint = AppConfig.settings.endPointUrl;

  constructor(private http: HttpClient) {
  }


  uploadFile(file: File): Promise<UserFile> {
    const type = file.type.replace('/', '-');

    const url = `${this.endpoint}${'file-upload/'}${file.name}${'/'}${type}${'/'}`;
    return this.http
      .post(url, file, {
        // NOTE: Because we are posting a Blob (File is a specialized Blob
        // object) as the POST body, we have to include the Content-Type
        // header. If we don't, the server will try to parse the body as
        // plain text.
        headers: {
          'Content-Type': file.type

        },
        params: {
          clientFilename: file.name,
          mimeType: file.type
        }
      })
      .toPromise()
      .then(res => res as UserFile)
      .catch(UtilsService.handleError);
  }

  uploadImage(file: File): Promise<UserImage> {
    const type = file.type.replace('/', '-');

    const url = `${this.endpoint}${'image-upload/'}${file.name}${'/'}${type}${'/'}`;
    return this.http
      .post(url, file, {
        // NOTE: Because we are posting a Blob (File is a specialized Blob
        // object) as the POST body, we have to include the Content-Type
        // header. If we don't, the server will try to parse the body as
        // plain text.
        headers: {
          'Content-Type': file.type

        },
        params: {
          clientFilename: file.name,
          mimeType: file.type
        }
      })
      .toPromise()
      .then(res => res as UserImage)
      .catch(UtilsService.handleError);
  }


}
