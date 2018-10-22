import * as React from 'react';
import { PlanetsService } from 'services/planets.service';
import { Planet } from 'models/Planet.model';
import ListComponent from 'components/templates/list/list.component';
import _ from 'lodash';
import { NextContext } from 'next';
interface Props {
  planets: Planet[];
}

class PlanetsList extends React.Component<Props> {
  static async getInitialProps(props: NextContext) {
    const planets = await PlanetsService.getPlanets(!_.isNil(props.req));
    return { planets };
  }
  render() {
    let { planets } = this.props;
    if (!(planets[0] instanceof Planet)) {
      planets = (planets as any).map(PlanetsService.toPlanet);
    }
    return (
      <div>
        <h1>Planets</h1>
        <ListComponent
          properties={['name', 'diameter']}
          objects={this.props.planets}
          model={Planet}
        />
      </div>
    );
  }
}

export default PlanetsList;
