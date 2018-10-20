import * as React from 'react';
import { MetaModel } from 'models/Meta.model';
import InputComponent from './input.component';

interface Props {
  object: any;
  model: any;
  properties: string[];
}

export class EditComponent extends React.Component<Props> {
  private _object = this.props.object;

  onChange = (name: string, value: string) => {
    this._object[name] = value;
  };
  submit = (e: any) => {
    e.preventDefault();
  };

  render() {
    const { object, model } = this.props;
    return (
      <form onSubmit={this.submit}>
        <button type="reset" className="btn btn-secondary">
          Discard
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        {this.props.properties.map(prop => (
          <InputComponent
            key={prop}
            prop={prop}
            label={MetaModel.getLabelKey(model.prototype, prop)}
            type={MetaModel.getInputType(model.prototype, prop)}
            defaultValue={object[prop]}
            onChange={this.onChange}
          />
        ))}
      </form>
    );
  }
}
export default EditComponent;
