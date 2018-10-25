import * as React from 'react';
import _ from 'lodash';

interface Props<T> {
  objects?: any[][];
  object?: any;
  models: T[];
  services: Array<(data: any) => any>;
  render: (objects: any[][] | any) => React.ReactNode;
}

export class MapToClass<T> extends React.Component<Props<T>> {
  render() {
    const { models, services } = this.props;
    if (_.isNil(this.props.objects)) {
      let object = { ...this.props.object };
      if (!(object instanceof (models as any)[0])) {
        object = services[0](object);
      }
      return <>{this.props.render(object)}</>;
    } else {
      let objects = [...this.props.objects];
      objects = objects.map((objectArray, index) => {
        if (!(objectArray[0] instanceof (models as any)[index])) {
          objectArray = (objectArray as any).map(services[index]);
        }
        return objectArray;
      });
      return <>{this.props.render(objects)}</>;
    }
  }
}
