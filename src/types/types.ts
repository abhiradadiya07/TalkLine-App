/* eslint-disable @typescript-eslint/no-unused-vars */
type AuthStateType = {
  email?: string;
  name?: string;
  username?: string;
  password?: string;
  password_confirmation?: string;
};

type AuthErrorType = {
  email?: string;
  name?: string;
  username?: string;
  password?: string;
};

type PostErrorType = {
  content?: string;
  image?: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  email?: string;
  image?: string;
};

type PostType = {
  id:number;
  user_id:number;
  content : string;
  image?:string;
  comment_count : number;
  user: User;
  created_at:string
}

type CommentType = {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  created_at: string;
  user: User;
};