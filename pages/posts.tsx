import * as React from 'react';
import ListComponent from 'components/list.component';
import { Post } from 'models/Post.model';
import { PostsService } from 'services/posts.service';
interface Props {
  posts: Post[];
}

class PostsList extends React.Component<Props> {
  static async getInitialProps() {
    const posts = await PostsService.getPosts();
    return { posts };
  }
  render() {
    return (
      <>
        <h1>Planets</h1>
        <ListComponent
          properties={['title', 'user']}
          objects={this.props.posts}
          model={Post}
        />
      </>
    );
  }
}

export default PostsList;
