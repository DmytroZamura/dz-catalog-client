import {UserFile, UserImage} from './file/file';

export class ObjectFile {
  id: number;
  file: number;
  file_details: UserFile;
  comment: string;
}

export class ObjectImage {
  id: number;
  file: number;
  file_details: UserImage;
  comment: string;
}
