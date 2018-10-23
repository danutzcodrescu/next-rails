import * as React from 'react';
import { MetaModel } from 'models/Meta.model';
import InputComponent from './input/input.component';
import _ from 'lodash';

type EditProperty =
  | string
  | {
      property: string;
      value: (obj: any) => any;
      options?: Array<{
        prop: string;
        value: string;
      }>;
    };

interface Props {
  object: any;
  model: any;
  properties: EditProperty[];
  specificValues?: Map<string, { values: any[]; identifier: string }>;
  updateCallback: (obj: any) => void;
}

export class EditComponent extends React.Component<Props> {
  private _object = this.props.object;

  onChange = (name: string, value: string) => {
    if (
      !_.isNil(this.props.specificValues) &&
      this.props.specificValues.has(name)
    ) {
      const data = this.props.specificValues.get(name)!;
      this._object[name] = data.values.find(
        // tslint:disable-next-line
        val => val[data.identifier] == value
      );
    } else {
      this._object[name] = value;
    }
  };
  submit = (e: any) => {
    e.preventDefault();
    this.props.updateCallback(this._object);
  };

  render() {
    const { object, model } = this.props;
    return (
      <form onSubmit={this.submit}>
        <button type='reset' className='btn btn-secondary'>
          Discard
        </button>
        <button type='submit' className='btn btn-primary'>
          Save
        </button>
        {this.props.properties.map(prop => (
          <InputComponent
            key={_.isString(prop) ? prop : prop.property}
            prop={_.isString(prop) ? prop : prop.property}
            label={MetaModel.getLabelKey(
              model.prototype,
              _.isString(prop) ? prop : prop.property
            )}
            data={MetaModel.getInputData(
              model.prototype,
              _.isString(prop) ? prop : prop.property
            )}
            defaultValue={_.isString(prop) ? object[prop] : prop.value(object)}
            onChange={this.onChange}
            options={_.isString(prop) ? undefined : prop.options}
          />
        ))}
      </form>
    );
  }
}
export default EditComponent;
