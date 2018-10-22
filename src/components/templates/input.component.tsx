import * as React from 'react';
import { InputData } from 'models/Meta.model';
import './input.component.scss';
import * as classNames from 'classnames';
import _ from 'lodash';

interface Props {
  prop: string;
  label: string;
  defaultValue: any;
  data: InputData;
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
    const { data, prop, defaultValue } = this.props;

    switch (data.type) {
      case 'textarea':
        return (
          <textarea
            className='form-control'
            id={prop}
            name={prop}
            defaultValue={defaultValue}
            onChange={this.onChange}
            {..._.omit(data, ['type'])}
          />
        );
      case 'select':
        return (
          <select
            className='form-control'
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
      case 'radio':
        return this.props.options!.map(option => (
          <div className='form-check form-check-inline' key={option.value}>
            <input
              key={option.value}
              type='radio'
              name={prop}
              value={option.value}
              id={`${prop}-${option.value}`}
              defaultChecked={option.value === defaultValue}
              onChange={this.onChange}
            />
            <label
              className='form-check-label'
              htmlFor={`${prop}-${option.value}`}
            >
              {option.prop}
            </label>
          </div>
        ));
      default:
        return (
          <input
            type={data.type}
            className='form-control'
            id={prop}
            name={prop}
            defaultValue={defaultValue}
            onChange={this.onChange}
            {..._.omit(data, ['type'])}
          />
        );
    }
  }

  render() {
    const { label, prop, data } = this.props;
    return (
      <div className='form-group row'>
        <label
          htmlFor={prop}
          className={classNames('col-md-2', 'col-form-label', {
            required: !_.isNil(data.required) && data.required
          })}
        >
          {label}:
        </label>
        <div className='col-md-10'> {this.renderInput()}</div>
      </div>
    );
  }
}
export default InputComponent;
