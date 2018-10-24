import * as React from 'react';
import { MetaModel } from 'models/Meta.model';
import _ from 'lodash';
import ReadOnlyComponent from '../readonly/readonly.component';
import InputComponent from '../input/input.component';

type EditProperty =
  | string
  | {
      property: string;
      value: (obj: any) => any;
      options?: Array<{
        prop: string;
        value: string;
      }>;
      type: 'defined';
    }
  | {
      label: string;
      value: (obj: any) => any;
      type: 'calculated';
    };

interface Props {
  object: any;
  model: any;
  properties: EditProperty[];
  specificValues?: Map<string, { values: any[]; identifier: string }>;
  updateCallback: (obj: any) => void;
}

interface State {
  object: any;
}

export class EditComponent extends React.Component<Props, State> {
  state: State = {
    object: this.props.object
  };

  onChange = (name: string, value: string) => {
    const object = _.cloneDeep(this.state.object);
    if (
      !_.isNil(this.props.specificValues) &&
      this.props.specificValues.has(name)
    ) {
      const data = this.props.specificValues.get(name)!;

      object[name] = data.values.find(
        // tslint:disable-next-line
        val => val[data.identifier] == value
      );
    } else {
      object[name] = value;
    }
    this.setState({
      object
    });
  };

  submit = (e: any) => {
    e.preventDefault();
    this.props.updateCallback(this.state.object);
  };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (
      nextState.object !== this.state.object &&
      _.isNil(
        nextProps.properties.some(
          prop => !_.isString(prop) && prop.type === 'defined'
        )
      )
    ) {
      return false;
    }
    return true;
  }

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
        {this.props.properties.map(prop => {
          if (_.isString(prop)) {
            return (
              <InputComponent
                key={prop}
                prop={prop}
                label={MetaModel.getLabelKey(model.prototype, prop)}
                data={MetaModel.getInputData(model.prototype, prop)}
                defaultValue={object[prop]}
                onChange={this.onChange}
              />
            );
          } else if (prop.type === 'defined') {
            return (
              <InputComponent
                key={prop.property}
                prop={prop.property}
                label={MetaModel.getLabelKey(model.prototype, prop.property)}
                data={MetaModel.getInputData(model.prototype, prop.property)}
                defaultValue={prop.value(object)}
                onChange={this.onChange}
                options={prop.options}
              />
            );
          } else {
            return (
              <ReadOnlyComponent
                key={prop.label}
                label={prop.label}
                value={prop.value(this.state.object)}
              />
            );
          }
        })}
      </form>
    );
  }
}
export default EditComponent;
