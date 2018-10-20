import { MetaModel } from './Meta.model';

export class Planet {
  private _id: string;

  @MetaModel.labelKey('Name')
  @MetaModel.inputType('text')
  private _name: string;

  @MetaModel.labelKey('Diameter')
  @MetaModel.inputType('number')
  private _diameter: number;

  @MetaModel.labelKey('Rotation period')
  @MetaModel.inputType('number')
  private _rotation_period: number;

  @MetaModel.labelKey('Orbital period')
  @MetaModel.inputType('number')
  private _orbital_period: number;

  @MetaModel.labelKey('Gravity')
  @MetaModel.inputType('text')
  private _gravity: string;

  @MetaModel.labelKey('Population')
  @MetaModel.inputType('number')
  private _population: number;

  @MetaModel.labelKey('Climate')
  @MetaModel.inputType('text')
  private _climate: string;

  @MetaModel.labelKey('Terrain')
  @MetaModel.inputType('text')
  private _terrain: string;

  @MetaModel.labelKey('Surface water')
  @MetaModel.inputType('number')
  private _surface_water: number;

  [prop: string]: any;
  constructor(
    id: string,
    name: string,
    diameter: number,
    rotation_period: number,
    orbital_period: number,
    gravity: string,
    population: number,
    climate: string,
    terrain: string,
    surface_water: number
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
  set name(name: string) {
    this._name = name;
  }

  get diameter() {
    return this._diameter;
  }
  set diameter(diameter: number) {
    this._diameter = diameter;
  }

  get rotation_period() {
    return this._rotation_period;
  }
  set rotation_period(rotation_period: number) {
    this._rotation_period = rotation_period;
  }
  get orbital_period() {
    return this._orbital_period;
  }
  set orbital_period(orbital_period: number) {
    this._orbital_period = orbital_period;
  }

  get gravity() {
    return this._gravity;
  }
  set gravity(gravity: string) {
    this._gravity = gravity;
  }
  get population() {
    return this._population;
  }
        set population(population: string) {
          this._population = population;
        }

  get climate() {
    return this._climate;
  }
  set climate(climate: string) {
    this._climate = climate;
  }

  get terrain() {
    return this._terrain;
  }
  set terrain(terrain: string) {
    this._terrain = terrain;
  }

  get surface_water() {
    return this._surface_water;
  }
  set surface_water(surface_water: string) {
    this._surface_water = surface_water;
  }
}
