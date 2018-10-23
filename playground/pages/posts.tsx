import * as React from 'react';
import ListComponent from 'components/templates/list/list.component';
import { Post } from 'models/Post.model';
import { PostsService, PostJSONUpdate, PostJSON } from 'services/posts.service';
import { NextContext } from 'next';
import { RouterParams } from 'src/utilities/types';
import _ from 'lodash';
import EditComponent from 'components/templates/edit/edit.component';
import { User } from 'models/User.model';
import { UsersService } from 'services/users.service';

interface Props {
  posts: Post[];
  users: User[];
}

interface State {
  new: boolean;
  posts: Post[];
}

class PostsList extends React.Component<Props, State> {
  static async getInitialProps(props: NextContext<RouterParams>) {
    const [posts, users] = await Promise.all([
      PostsService.getPosts(!_.isNil(props.req)),
      UsersService.getUsers(!_.isNil(props.req))
    ]);
    return { posts, users };
  }

  state: State = {
    new: false,
    posts: this.props.posts
  };

  create = async (post: Post) => {
    const newPost = await PostsService.newPost(post);
    newPost.user = this.props.users.find(
      user => user.id === newPost.userId!.toString()
    );
    this.setState(prevState => ({
      posts: [...prevState.posts, PostsService.toPost(newPost as PostJSON)]
    }));
  };

  render() {
    let { users } = this.props;
    let { posts } = this.state;
    if (!(posts[0] instanceof Post)) {
      posts = (posts as any).map(PostsService.toPost);
    }
    if (!(users[0] instanceof User)) {
      users = users.map(UsersService.toUser);
    }
    return (
      <>
        <h1>Posts</h1>
        <ListComponent
          properties={[
            'title',
            { property: 'user', value: (post: Post) => post.user.name }
          ]}
          objects={posts}
          model={Post}
        />
        <button
          onClick={() => this.setState(prevState => ({ new: !prevState.new }))}
        >
          Toggle new
        </button>
        {this.state.new ? (
          <EditComponent
            object={new Post('', '', '', new User('', ''))}
            model={Post}
            properties={[
              'title',
              'body',
              {
                property: 'user',
                value: (post: Post) => post.user.id,
                options: users.map(user => ({
                  prop: user.name,
                  value: user.id
                }))
              }
            ]}
            specificValues={
              new Map([['user', { values: users, identifier: 'id' }]])
            }
            updateCallback={this.create}
          />
        ) : null}
      </>
    );
  }
}

export default PostsList;
