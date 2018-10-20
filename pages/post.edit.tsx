import * as React from 'react';
import { NextContext } from 'next';
import { Post } from 'models/Post.model';
import { RouterParams } from 'src/utilities/types';
import { PostsService } from 'services/posts.service';
import _ from 'lodash';
import EditComponent from 'components/edit.component';
import { User } from 'models/User.model';
import { UsersService } from 'services/users.service';

interface Props {
  post: Post;
  users: User[];
}

export class PostsEdit extends React.Component<Props> {
  static async getInitialProps(props: NextContext<RouterParams>) {
    const [post, users] = await Promise.all([
      PostsService.getPost(props.query.id, !_.isNil(props.req)),
      UsersService.getUsers(!_.isNil(props.req))
    ]);
    return { post, users };
  }

  render() {
    let { post, users } = this.props;
    if (!(post instanceof Post)) {
      post = PostsService.toPost(post);
    }
    if (!(users[0] instanceof User)) {
      users = users.map(UsersService.toUser);
    }
    return (
      <>
        <h1>Edit {post.name}</h1>
        <EditComponent
          model={Post}
          object={post}
          properties={[
            'title',
            'body',
            {
              property: 'user',
              value: (post: Post) => post.user.id,
              options: users.map(user => ({ prop: user.name, value: user.id }))
            }
          ]}
          specificValues={
            new Map([['user', { values: users, identifier: 'id' }]])
          }
        />
      </>
    );
  }
}
export default PostsEdit;
