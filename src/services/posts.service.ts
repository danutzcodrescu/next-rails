import axios from 'axios';
import { Post } from 'models/Post.model';

export interface PostJSON {
  id: string;
  title: string;
  body: string;
  userId: number;
}

export class PostsService {
  static url = 'http://localhost:4200/posts';

  static async getPosts() {
    const resp = await axios.get(`${PostsService.url}`);
    return resp.data.map(PostsService.toPost);
  }

  static async getPost(id: string) {
    const resp = await axios.get(`${PostsService.url}/${id}`);
    return PostsService.toPost(resp.data);
  }

  static toPost(post: PostJSON) {
    return new Post(post.id, post.title, post.body, post.userId);
  }
}
