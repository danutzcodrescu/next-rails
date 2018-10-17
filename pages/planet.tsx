import * as React from 'react';
import { Planet } from 'models/Planet.model';
import { PlanetsService } from 'services/planets.service';
import { withRouter, WithRouterProps } from 'next/router';
import ViewComponent from 'components/view.component';
interface Props extends WithRouterProps {
  planet: Planet;
}

export class PlanetPage extends React.Component<Props> {
  static async getInitialProps(props: any) {
    const planet = await PlanetsService.getPlanet(props.query.id);
    return { planet };
  }
  render() {
    return (
      <>
        <h1>View</h1>
        <ViewComponent
          object={this.props.planet}
          properties={['name', 'diameter', 'population', 'terrain']}
        />
      </>
    );
  }
}
const PlanetComponent = withRouter(PlanetPage);
export default PlanetComponent;
