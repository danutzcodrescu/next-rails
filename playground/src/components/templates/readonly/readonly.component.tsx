import * as React from 'react';
import classNames from 'classnames';

interface Props {
  label: string;
  value: any;
}

export default class ReadOnlyComponent extends React.Component<Props> {
  render() {
    const { label, value } = this.props;
    return (
      <div className='form-group row'>
        <label className={classNames('col-md-2', 'col-form-label')}>
          {label}:
        </label>
        <div className='col-md-10'>{value}</div>
      </div>
    );
  }
}
