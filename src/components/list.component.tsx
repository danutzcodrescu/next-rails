import * as React from 'react';
import { MetaModel } from 'models/Meta.model';

interface Props {
  properties: string[];
  objects: any[];
  model: any;
}

export class ListComponent extends React.Component<Props> {
  render() {
    const { model, objects, properties } = this.props;
    return (
      <table className='table'>
        <thead>
          <tr>
            {properties.map(prop => (
              <td key={prop}>{MetaModel.getLabelKey(model.prototype, prop)}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {objects.map(object => (
            <tr key={object.id}>
              {properties.map(prop => (
                <td key={`${object.id}-${prop}`}>{object[prop]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default ListComponent;
