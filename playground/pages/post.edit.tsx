import * as React from 'react';
import { NextContext } from 'next';
import { Post } from 'models/Post.model';
import { RouterParams } from 'src/utilities/types';
import { PostsService } from 'services/posts.service';
import _ from 'lodash';
import EditComponent from 'components/templates/edit/edit.component';
import { User } from 'models/User.model';
import { UsersService } from 'services/users.service';
import { MapToClass } from 'components/utilities/mapToClass.component';

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
    return (
      <MapToClass
        models={[Post, User]}
        services={[PostsService.toPost, UsersService.toUser]}
        objects={[[this.props.post], this.props.users]}
        render={([posts, users]) => (
          <>
            <h1>Edit {posts[0].name}</h1>
            <EditComponent
              model={Post}
              object={posts[0]}
              properties={[
                'title',
                'body',
                {
                  property: 'user',
                  value: (post: Post) => post.user.id,
                  options: users.map((user: User) => ({
                    prop: user.name,
                    value: user.id
                  })),
                  type: 'defined'
                },
                {
                  label: 'calculated',
                  type: 'calculated',
                  value: (post: Post) =>
                    post.title + ' guuust ' + post.user.name
                }
              ]}
              specificValues={
                new Map([['user', { values: users, identifier: 'id' }]])
              }
              updateCallback={PostsService.updatePost}
            />
          </>
        )}
      />
    );
  }
}
export default PostsEdit;
