import * as React from 'react';
import { MetaModel } from 'models/Meta.model';
import Link from 'next/link';

interface Props {
  properties: string[];
  objects: any[];
  model: any;
}

export class ListComponent extends React.Component<Props> {
  render() {
    const { model, objects, properties } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            {properties.map(prop => (
              <td key={prop}>{MetaModel.getLabelKey(model.prototype, prop)}</td>
            ))}
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {objects.map(object => (
            <tr key={object.id}>
              {properties.map(prop => (
                <td key={`${object.id}-${prop}`}>{object[prop]}</td>
              ))}
              <td>
                <Link
                  href={{
                    pathname: `/${model.name.toLowerCase()}`,
                    query: { id: object.id }
                  }}
                  as={`/${model.name.toLowerCase()}s/${object.id}`}
                >
                  <a>View</a>
                </Link>{' '}
                |{' '}
                <Link
                  href={{
                    pathname: `/${model.name.toLowerCase()}.edit`,
                    query: { id: object.id }
                  }}
                  as={`/${model.name.toLowerCase()}s/${object.id}/edit`}
                >
                  <a>Edit</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default ListComponent;
