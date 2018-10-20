import * as React from 'react';
import { MetaModel } from 'models/Meta.model';

interface Props {
  properties: string[];
  object: any;
  model: any;
}

export class ViewComponent extends React.Component<Props> {
  render() {
    const { object, model } = this.props;
    return this.props.properties.map(prop => (
      <div className="container" key={prop}>
        <div className="row">
          <div className="col col-md-1">
            {MetaModel.getLabelKey(model.prototype, prop)}:
          </div>
          <div className="col col-md-9">{object[prop]}</div>
        </div>
      </div>
    ));
  }
}
export default ViewComponent;
