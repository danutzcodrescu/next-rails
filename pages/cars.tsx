import * as React from 'react';
import ListComponent from 'components/templates/list/list.component';
import { Car } from 'models/Car.model';
import { Car sService, Car JSON } from 'services/car.service';
import { NextContext } from 'next';
import { RouterParams } from 'src/utilities/types';
import _ from 'lodash';

interface Props {
  car:
}

class CarsList extends React.Component<Props> {
  static async getInitialProps(props: NextContext<RouterParams>) {
    const [cars] = await CarsService.getCars(!_.isNil(props.req));
    return { cars };
  }

  render() {
    let { cars } = this.props;
    if (!(cars[0] instanceof Car)) {
      cars = (cars as any).map(CarsService.toCar);
    }
    return (
      <>
      <h1>Cars < /h1>
      < ListComponent
          properties = {[  id,   manufacture,   mileage,   brand ]}
          objects = { car }
          model = { Car }
      />
    )
  }
}

export default CarsList;
