import * as React from "react";
import { NextContext } from "next";
import { <%= modelClass %> } from "models/<%= modelClass %>.model";
import { RouterParams } from "src/utilities/types";
import { <%= modelClass %>sService } from "services/<%= model %>s.service";
import _ from "lodash";
import EditComponent from "components/templates/edit/edit.component";

interface Props {
  <%= model %>: <%= modelClass %>;
}

export class <%= modelClass %>sEdit extends React.Component<Props> {
  static async getInitialProps(props: NextContext<RouterParams>) {
    const { <%= model %> }= await <%= modelClass %>sService.get<%= modelClass %>(props.query.id, !_.isNil(props.req))
    return { <%= model %> };
  }

  render() {
    let { <%= model %> } = this.props;
    if (!(<%= model %> instanceof <%= modelClass %>)) {
      <%= model %> = <%= modelClass %>sService.to<%= modelClass %>(<%= model %>);
    }
    return (
      <>
        <h1>Edit {<%= model %>.name}</h1>
        <EditComponent
          model={<%= modelClass %>}
          object={<%= model %>}
          properties={[
            <% properties.forEach(function (prop, index) { %> <% if (index === properties.length - 1) {%> "<%= prop %>" <%} else {%> "<%= prop %>", <% } }) %>
          ]}
          updateCallback={<%= modelClass %>sService.update<%= modelClass %>}
        />
      </>
    );
  }
}
export default <%= modelClass %>sEdit;
