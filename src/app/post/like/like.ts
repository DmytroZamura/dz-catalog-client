import {UserWithProfile} from '../../profile/profile';

export class PostLike {
id: number;
post: number;
user: number;
user_data: UserWithProfile;
create_data: string;
}

export class PostCommentLike {
id: number;
comment: number;
user: number;
user_data: UserWithProfile;
create_data: string;
}

export class Like {
id: number;
user: number;
user_data: UserWithProfile;
create_data: string;
}


