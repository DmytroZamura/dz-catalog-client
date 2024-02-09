import {UserWithProfile} from '../profile/profile';


export class TagQty {

  followers: number;

}

export  class TagFollower {
  tag: number;
  user: number;
  user_data: UserWithProfile;

}

export class Tag {
  id: number;
  name: string;
  qty: TagQty;
  follow_status: boolean;
}

