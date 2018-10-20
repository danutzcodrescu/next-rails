import * as React from 'react';
import { MetaModel } from 'models/Meta.model';

interface Props {
  prop: string;
  label: string;
  defaultValue: any;
  type:
    | 'text'
    | 'number'
    | 'date'
    | 'password'
    | 'email'
    | 'textarea'
    | 'select';
  onChange: (name: string, value: string) => void;
  options?: Array<{ prop: string; value: string }>;
}

export class InputComponent extends React.Component<Props> {
  onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.props.onChange(e.target.name, e.target.value);
  };

  renderInput() {
    const { type, prop, defaultValue } = this.props;

    switch (type) {
      case 'textarea':
        return (
          <textarea
            className="form-control"
            id={prop}
            name={prop}
            defaultValue={defaultValue}
            onChange={this.onChange}
          />
        );
      case 'select':
        return (
          <select
            className="form-control"
            id={prop}
            name={prop}
            defaultValue={defaultValue}
            onChange={this.onChange}
          >
            {this.props.options!.map(option => (
              <option key={option.value} value={option.value}>
                {option.prop}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={type}
            className="form-control"
            id={prop}
            name={prop}
            defaultValue={defaultValue}
            onChange={this.onChange}
          />
        );
    }
  }

  render() {
    const { label, prop, defaultValue, type } = this.props;
    return (
      <div className="form-group row">
        <label htmlFor={prop} className="col-md-2 col-form-label">
          {label}:
        </label>
        <div className="col-md-10"> {this.renderInput()}</div>
      </div>
    );
  }
}
export default InputComponent;
