import axios from 'axios';
import { Post } from 'models/Post.model';
import { UsersService, UserJSON } from './users.service';

export interface PostJSON {
  id: string;
  title: string;
  body: string;
  userId: number;
  user: UserJSON;
}

export class PostsService {
  static url = 'http://localhost:4200/posts';

  static async getPosts(ssr: boolean = false) {
    const resp = await axios.get(`${PostsService.url}?_expand=user`);
    if (ssr) {
      return resp.data;
    }
    return resp.data.map(PostsService.toPost);
  }

  static async getPost(id: string, ssr: boolean = false) {
    const resp = await axios.get(`${PostsService.url}/${id}?_expand=user`);
    if (ssr) {
      return resp.data;
    }
    return PostsService.toPost(resp.data);
  }

  static toPost(post: PostJSON) {
    return new Post(
      post.id,
      post.title,
      post.body,
      UsersService.toUser(post.user)
    );
  }
}
