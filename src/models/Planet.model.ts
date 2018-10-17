import { MetaModel } from './Meta.model';

export class Planet {
  private _id: string;

  @MetaModel.labelKey('Name')
  private _name: string;

  @MetaModel.labelKey('Diameter')
  private _diameter: string;

  @MetaModel.labelKey('Rotation period')
  private _rotation_period: string;

  @MetaModel.labelKey('Orbital period')
  private _orbital_period: string;

  @MetaModel.labelKey('Gravity')
  private _gravity: string;

  @MetaModel.labelKey('Population')
  private _population: string;

  @MetaModel.labelKey('Climate')
  private _climate: string;

  @MetaModel.labelKey('Terrain')
  private _terrain: string;

  @MetaModel.labelKey('Surface water')
  private _surface_water: string;

  [prop: string]: any;
  constructor(
    id: string,
    name: string,
    diameter: string,
    rotation_period: string,
    orbital_period: string,
    gravity: string,
    population: string,
    climate: string,
    terrain: string,
    surface_water: string
  ) {
    this._id = id;
    this._name = name;
    this._diameter = diameter;
    this._rotation_period = rotation_period;
    this._orbital_period = orbital_period;
    this._gravity = gravity;
    this._population = population;
    this._climate = climate;
    this._terrain = terrain;
    this._surface_water = surface_water;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }
  get diameter() {
    return this._diameter;
  }
  get rotation_period() {
    return this._rotation_period;
  }
  get orbital_period() {
    return this._orbital_period;
  }
  get gravity() {
    return this._gravity;
  }
  get population() {
    return this._population;
  }
  get climate() {
    return this._climate;
  }
  get terrain() {
    return this._terrain;
  }
  get surface_water() {
    return this._surface_water;
  }
}
