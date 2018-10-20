import * as React from 'react';
import ListComponent from 'components/list.component';
import { Post } from 'models/Post.model';
import { PostsService } from 'services/posts.service';
import { NextContext } from 'next';
import { RouterParams } from 'src/utilities/types';
import _ from 'lodash';
import { User } from 'models/User.model';
interface Props {
  posts: Post[];
}

class PostsList extends React.Component<Props> {
  static async getInitialProps(props: NextContext<RouterParams>) {
    const posts = await PostsService.getPosts(!_.isNil(props.req));
    return { posts };
  }
  render() {
    let { posts } = this.props;
    if (!(posts[0] instanceof Post)) {
      posts = (posts as any).map(PostsService.toPost);
    }
    return (
      <>
        <h1>Posts</h1>
        <ListComponent
          properties={[
            'title',
            { property: 'user', value: (post: Post) => post.user.name }
          ]}
          objects={this.props.posts}
          model={Post}
        />
      </>
    );
  }
}

export default PostsList;
