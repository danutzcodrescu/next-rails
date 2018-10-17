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
}

export class PlanetsService {
  static getPlanets() {
    return axios
      .get('https://swapi.co/api/planets')
      .then<Planet[]>(resp => resp.data.results.map(PlanetsService.toPlanet));
  }

  static toPlanet(planet: PlanetJSON) {
    return new Planet(
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
