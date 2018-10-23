import * as React from "react";
import { withRouter, WithRouterProps } from "next/router";
import ViewComponent from "components/templates/view/view.component";
import { <%= modelClass %> } from "models/<%= modelClass %>.model";
import { <%= modelClass %>sService } from "services/<%= model %>s.service";
import { NextContext } from "next";
import { RouterParams } from "src/utilities/types";
import _ from "lodash";
import Link from "next/link";

interface Props extends WithRouterProps {
  <%= model %>: <%= modelClass %>;
}

export class <%= modelClass %>Page extends React.Component<Props> {
  static async getInitialProps(props: NextContext<RouterParams>) {
    const <%= model %> = await <%= modelClass %>sService.get<%= modelClass %>(
      props.query.id,
      !_.isNil(props.req)
    );
    return { <%= model %> };
  }
  render() {
    let { <%= model %> } = this.props;
    if (!(<%= model %> instanceof <%= modelClass %>)) {
      <%= model %> = <%= modelClass %>sService.to<%= modelClass %>(<%= model %>);
    }
    return (
      <>
        <div className="row">
          <div className="col col-md-8" />
          <div className="col col-md-4 text-right">
            <Link
              href={{
                pathname: `/<%= model %>.edit`,
                query: { id: <%= model %>.id }
              }}
              as={`/<%= model %>s/${<%= model %>.id}/edit`}
            >
              <button className="btn btn-primary"> Edit </button>
            </Link>
          </div>
        </div>
        <h1> View {<%= model %>.title} </h1>
        <ViewComponent
        model={<%= modelClass %>}
          object={<%= model %>}
          properties={[
            <% properties.forEach(function (prop, index) { %> <% if (index === properties.length - 1) {%> <%= prop %> <%} else {%> <%= prop %>, <% } }) %>
          ]}
        />
      </>
    );
  }
}
const PostComponent = withRouter(<%= modelClass %>Page);
export default <%= modelClass %>Component;
