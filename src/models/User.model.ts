import { MetaModel } from './Meta.model';

export class User {
  private _id: string;

  @MetaModel.labelKey('Name')
  private _name: string;

  [prop: string]: any;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
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
}
