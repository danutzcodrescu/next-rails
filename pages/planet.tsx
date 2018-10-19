import * as React from 'react';
import { Planet } from 'models/Planet.model';
import { PlanetsService } from 'services/planets.service';
import { withRouter, WithRouterProps } from 'next/router';
import ViewComponent from 'components/view.component';
import * as _ from 'lodash';
import { NextContext } from 'next';
interface Props extends WithRouterProps {
  planet: Planet;
}

export class PlanetPage extends React.Component<Props> {
  static async getInitialProps(props: NextContext<{ id: string }>) {
    const planet = await PlanetsService.getPlanet(
      props.query.id,
      !_.isNil(props.req)
    );
    return { planet };
  }
  render() {
    return (
      <>
        <h1>View</h1>
        <ViewComponent
          object={this.props.planet}
          model={Planet}
          properties={['name', 'diameter', 'population', 'terrain']}
        />
      </>
    );
  }
}
const PlanetComponent = withRouter(PlanetPage);
export default PlanetComponent;
