import * as React from 'react';
import { withRouter, WithRouterProps } from 'next/router';
import ViewComponent from 'components/view.component';
import { Post } from 'models/Post.model';
import { PostsService } from 'services/posts.service';
interface Props extends WithRouterProps {
  post: Post;
}

export class PostPage extends React.Component<Props> {
  static async getInitialProps(props: any) {
    const post = await PostsService.getPost(props.query.id);
    return { post };
  }
  render() {
    return (
      <>
        <h1>View</h1>
        <ViewComponent
          object={this.props.post}
          properties={['title', 'body', 'user']}
        />
      </>
    );
  }
}
const PostComponent = withRouter(PostPage);
export default PostComponent;
