import * as React from 'react';
import { MetaModel } from 'models/Meta.model';

interface Props {
  prop: string;
  label: string;
  defaultValue: any;
  type: 'text' | 'number' | 'date' | 'password' | 'email';
  onChange: (name: string, value: string) => void;
}

export class InputComponent extends React.Component<Props> {
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e.target.name, e.target.value);
  };

  render() {
    const { label, prop, defaultValue, type } = this.props;
    return (
      <div className='form-group row'>
        <label htmlFor={prop} className='col-md-2 col-form-label'>
          {label}:
        </label>
        <div className='col-md-10'>
          <input
            type={type}
            className='form-control'
            id={prop}
            name={prop}
            defaultValue={defaultValue}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}
export default InputComponent;
