import axios from 'axios';
import { Planet } from '../models/Planet.model';

export interface PlanetJSON {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}

export class PlanetsService {
  static async getPlanets(ssr: boolean = false) {
    const resp = await axios.get('https://swapi.co/api/planets');
    if (ssr) {
      return resp.data.results.map((result: any) => {
        const regex = new RegExp(/planets\/([0-9]{1,})/);
        return { ...result, id: result.url.match(regex)![1] };
      });
    }
    return resp.data.results.map(PlanetsService.toPlanet);
  }

  static async getPlanet(id: string, ssr: boolean = false) {
    const resp = await axios.get(`https://swapi.co/api/planets/${id}`);
    if (ssr) {
      return resp.data;
    }
    return PlanetsService.toPlanet(resp.data);
  }

  static toPlanet(planet: PlanetJSON) {
    const regex = new RegExp(/planets\/([0-9]{1,})/);
    return new Planet(
      planet.url.match(regex)![1],
      planet.name,
      planet.diameter,
      planet.rotation_period,
      planet.orbital_period,
      planet.gravity,
      planet.population,
      planet.climate,
      planet.terrain,
      planet.surface_water
    );
  }
}
