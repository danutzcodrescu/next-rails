import * as React from 'react';
import { Planet } from 'models/Planet.model';
import { PlanetsService } from 'services/planets.service';
import { withRouter, WithRouterProps } from 'next/router';
import ViewComponent from 'components/view.component';
import * as _ from 'lodash';
import { NextContext } from 'next';
import Link from 'next/link';
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
    let { planet } = this.props;
    if (!(planet instanceof Planet)) {
      planet = PlanetsService.toPlanet(planet);
    }
    return (
      <>
        <div className='row'>
          <div className='col col-md-8' />
          <div className='col col-md-4 text-right'>
            <Link
              href={{
                pathname: `/planet.edit`,
                query: { id: planet.id }
              }}
              as={`/planets/${planet.id}/edit`}
            >
              <button className='btn btn-primary'>Edit</button>
            </Link>
          </div>
        </div>
        <h1>View {planet.name}</h1>

        <ViewComponent
          object={planet}
          model={Planet}
          properties={['name', 'diameter', 'population', 'terrain']}
        />
      </>
    );
  }
}
const PlanetComponent = withRouter(PlanetPage);
export default PlanetComponent;
