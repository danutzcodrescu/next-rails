import axios from 'axios';
import { Post } from 'models/Post.model';
import { UsersService, UserJSON } from './users.service';

export interface PostJSONUpdate {
  id: string;
  title: string;
  body: string;
  userId: number;
  [key: string]: any;
}

export interface PostJSON extends PostJSONUpdate {
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

  static async updatePost(post: Post) {
    const { data } = await axios.put<PostJSONUpdate>(
      `${PostsService.url}/${post.id}`,
      post.flatten()
    );
    return data;
  }

  static async newPost(post: Post) {
    const { data } = await axios.post<PostJSONUpdate>(
      `${PostsService.url}`,
      post.flatten()
    );
    return data;
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
