import * as React from 'react';
import { withRouter, WithRouterProps } from 'next/router';
import ViewComponent from 'components/view.component';
import { Post } from 'models/Post.model';
import { PostsService } from 'services/posts.service';
import { NextContext } from 'next';
import { RouterParams } from 'src/utilities/types';
import _ from 'lodash';
import Link from 'next/link';

interface Props extends WithRouterProps {
  post: Post;
}

export class PostPage extends React.Component<Props> {
  static async getInitialProps(props: NextContext<RouterParams>) {
    const post = await PostsService.getPost(
      props.query.id,
      !_.isNil(props.req)
    );
    return { post };
  }
  render() {
    let { post } = this.props;
    if (!(post instanceof Post)) {
      post = PostsService.toPost(post);
    }
    return (
      <>
        <div className='row'>
          <div className='col col-md-8' />
          <div className='col col-md-4 text-right'>
            <Link
              href={{
                pathname: `/post.edit`,
                query: { id: post.id }
              }}
              as={`/posts/${post.id}/edit`}
            >
              <button className='btn btn-primary'>Edit</button>
            </Link>
          </div>
        </div>
        <h1>View {post.title}</h1>
        <ViewComponent
          model={Post}
          object={post}
          properties={[
            'title',
            'body',
            { property: 'user', value: (post: Post) => post.user.name }
          ]}
        />
      </>
    );
  }
}
const PostComponent = withRouter(PostPage);
export default PostComponent;
