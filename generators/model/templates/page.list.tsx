import * as React from 'react';
import ListComponent from 'components/templates/list/list.component';
import { <%= modelClass %> } from 'models/<%= modelClass %>.model';
import { <%= modelClass %> sService, <%= modelClass %> JSON } from 'services/<%= model %>.service';
import { NextContext } from 'next';
import { RouterParams } from 'src/utilities/types';
import _ from 'lodash';

interface Props {
  <%= model %>:
}

class <%= modelClass %>sList extends React.Component<Props> {
  static async getInitialProps(props: NextContext<RouterParams>) {
    const [<%= model %>s] = await <%= modelClass %>sService.get<%= modelClass %>s(!_.isNil(props.req));
    return { <%= model %>s };
  }

  render() {
    let { <%= model %>s } = this.props;
    if (!(<%= model %>s[0] instanceof <%= modelClass %>)) {
      <%= model %>s = (<%= model %>s as any).map(<%= modelClass %>sService.to<%= modelClass %>);
    }
    return (
      <>
      <h1><%= modelClass %>s < /h1>
      < ListComponent
          properties = {[<% properties.forEach(function (prop, index) { %> <% if (index === properties.length - 1) {%> <%= prop %> <%} else {%> <%= prop %>, <% } }) %>]}
          objects = { <%= model %> }
          model = { <%= modelClass %> }
      />
    )
  }
}

export default <%= modelClass %>sList;
