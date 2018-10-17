import * as React from 'react';
import { MetaModel } from 'models/Meta.model';
import { object } from 'prop-types';

interface Props {
  properties: string[];
  object: any;
}

export class ViewComponent extends React.Component<Props> {
  render() {
    const { object } = this.props;
    return this.props.properties.map(prop => (
      <div className='container' key={prop}>
        <div className='row'>
          <div className='col col-md-1'>
            {MetaModel.getLabelKey(object, prop)}:
          </div>
          <div className='col col-md-9'>{object[prop]}</div>
        </div>
      </div>
    ));
  }
}
export default ViewComponent;
