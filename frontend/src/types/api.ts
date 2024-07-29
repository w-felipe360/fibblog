export interface PostType {
  id: number;
  user_id: number;
  title: string;
  description: string;
}
export interface CommentType {
  id: number;
  user_id: number;
  user_name: string,
  post_id: number;
  text: string;
}
export interface UserType {
  id: number;
  name: string;
}
