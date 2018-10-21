import * as React from 'react';
import { MetaModel } from 'models/Meta.model';
import Link from 'next/link';
import _ from 'lodash';

type ListProperty =
  | string
  | {
      property: string;
      value: (obj: any) => any;
    };

interface Props {
  properties: ListProperty[];
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
              <td key={_.isString(prop) ? prop : prop.property}>
                {MetaModel.getLabelKey(
                  model.prototype,
                  _.isString(prop) ? prop : prop.property
                )}
              </td>
            ))}
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {objects.map(object => (
            <tr key={object.id}>
              {properties.map(prop => (
                <td key={`${object.id}-${prop}`}>
                  {_.isString(prop) ? object[prop] : prop.value(object)}
                </td>
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
