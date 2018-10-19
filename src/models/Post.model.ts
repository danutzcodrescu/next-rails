import { MetaModel } from './Meta.model';

export class Post {
  private _id: string;

  @MetaModel.labelKey('Title')
  private _title: string;

  @MetaModel.labelKey('Body')
  private _body: string;

  @MetaModel.labelKey('User')
  private _user: number;

  [prop: string]: any;
  constructor(id: string, title: string, body: string, user: number) {
    this._id = id;
    this._title = title;
    this._body = body;
    this._user = user;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }
  get body() {
    return this._body;
  }
  get user() {
    return this._user;
  }
}
