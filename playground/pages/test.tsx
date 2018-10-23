import * as React from 'react';
import Axios from 'axios';
interface Props {
  todos: any[];
}

export default class Test extends React.Component<Props> {
  static async getInitialProps() {
    const data = await Axios.get('https://jsonplaceholder.typicode.com/todos');
    return { todos: data.data };
  }
  render() {
    return (
      <>
        {this.props.todos.map(todo => (
          <p key={todo.id}>{todo.title}</p>
        ))}
      </>
    );
  }
}
