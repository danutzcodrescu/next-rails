import * as React from 'react';
import { PlanetsService } from 'services/planets.service';
import { Planet } from 'models/Planet.model';
import ListComponent from 'components/list.component';
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
