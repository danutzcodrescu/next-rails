import * as React from "react";
import { withRouter, WithRouterProps } from "next/router";
import ViewComponent from "components/templates/view/view.component";
import { Car } from "models/Car.model";
import { Car sService } from "services/cars.service";
import { NextContext } from "next";
import { RouterParams } from "src/utilities/types";
import _ from "lodash";
import Link from "next/link";

interface Props extends WithRouterProps {
  car: Car;
}

export class CarPage extends React.Component<Props> {
  static async getInitialProps(props: NextContext<RouterParams>) {
    const car = await CarsService.getCar(
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
        <div className="row">
          <div className="col col-md-8" />
          <div className="col col-md-4 text-right">
            <Link
              href={{
                pathname: `/car.edit`,
                query: { id: car.id }
              }}
              as={`/cars/${car.id}/edit`}
            >
              <button className="btn btn-primary"> Edit </button>
            </Link>
          </div>
        </div>
        <h1> View {car.title} </h1>
        <ViewComponent
        model={Car}
          object={car}
          properties={[
              id,   manufacture,   mileage,   brand 
          ]}
        />
      </>
    );
  }
}
const PostComponent = withRouter(CarPage);
export default CarComponent;
