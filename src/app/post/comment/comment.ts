import {UserWithProfile} from '../../profile/profile';
import { UserImage} from '../../common/file/file';
import {UrlPreview} from '../../common/url-preview/url-preview';


export class PostComment {
  id: number;
  parent: number;
  post: number;
  user: number;
  user_data: UserWithProfile;
  reply_to: number;
  text: string;
  image: number;
  image_details: UserImage;
  urlpreview: UrlPreview;
  like_status: boolean;
  can_delete_status: boolean;
  update_date: string;
  eventsqty: PostCommentEventsQty;
}


export class  PostCommentEventsQty {
  comments: number;
  likes: number;
}
