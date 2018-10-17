import * as React from 'react';
import { PlanetsService } from 'services/planets.service';
import { Planet } from 'models/Planet.model';
import ListComponent from 'components/list.component';
interface Props {
  planets: Planet[];
}

class PlanetsList extends React.Component<Props> {
  static async getInitialProps() {
    const planets = await PlanetsService.getPlanets();
    return { planets };
  }
  render() {
    return (
      <>
        <h1>Planets</h1>
        <ListComponent
          properties={['name', 'diameter']}
          objects={this.props.planets}
          model={Planet}
        />
      </>
    );
  }
}

export default PlanetsList;
