import * as React from 'react';
import { Planet } from 'models/Planet.model';
import { NextContext } from 'next';
import { PlanetsService } from 'services/planets.service';
import { RouterParams } from 'src/utilities/types';
import * as _ from 'lodash';
import { EditComponent } from 'components/edit.component';

interface Props {
  planet: Planet;
}

export class EditPlanet extends React.Component<Props> {
  static async getInitialProps(props: NextContext<RouterParams>) {
    const planet = await PlanetsService.getPlanet(
      props.query.id,
      !_.isNil(props.req)
    );
    return { planet };
  }

  render() {
    let { planet } = this.props;
    if (!(planet instanceof Planet)) {
      planet = PlanetsService.toPlanet(planet);
    }
    return (
      <>
        <h1>Edit {planet.name}</h1>
        <EditComponent
          model={Planet}
          object={planet}
          properties={['name', 'diameter', 'population', 'terrain']}
        />
      </>
    );
  }
}
export default EditPlanet;
