import * as React from 'react';
import { MetaModel } from 'models/Meta.model';
import _ from 'lodash';

type ViewProperty =
  | string
  | {
      property: string;
      value: (obj: any) => any;
    };

interface Props {
  properties: ViewProperty[];
  object: any;
  model: any;
}

export class ViewComponent extends React.Component<Props> {
  render() {
    const { object, model } = this.props;
    return this.props.properties.map(prop => (
      <div className='container' key={_.isString(prop) ? prop : prop.property}>
        <div className='row'>
          <div className='col col-md-1'>
            {MetaModel.getLabelKey(
              model.prototype,
              _.isString(prop) ? prop : prop.property
            )}
            :
          </div>
          <div className='col col-md-9'>
            {_.isString(prop) ? object[prop] : prop.value(object)}
          </div>
        </div>
      </div>
    ));
  }
}
export default ViewComponent;
