import * as React from "react";
import { NextContext } from "next";
import { Car } from "models/Car.model";
import { RouterParams } from "src/utilities/types";
import { CarsService } from "services/cars.service";
import _ from "lodash";
import EditComponent from "components/templates/edit/edit.component";

interface Props {
  car: Car;
}

export class CarsEdit extends React.Component<Props> {
  static async getInitialProps(props: NextContext<RouterParams>) {
    const { car } = await CarsService.getCar(
      props.query.id,
      !_.isNil(props.req)
    );
    return { car };
  }

  render() {
    let { car } = this.props;
    if (!(car instanceof Car)) {
      car = CarsService.toCar(car);
    }
    return (
      <>
        <h1>Edit {car.name}</h1>
        <EditComponent
          model={Car}
          object={car}
          properties={["id", "manufacture", "mileage", "brand"]}
          updateCallback={CarsService.updateCar}
        />
      </>
    );
  }
}
export default CarsEdit;
