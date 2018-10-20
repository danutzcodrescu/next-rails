import { MetaModel } from './Meta.model';
import { User } from './User.model';

export class Post {
  private _id: string;

  @MetaModel.labelKey('Title')
  @MetaModel.inputType('text')
  private _title: string;

  @MetaModel.labelKey('Body')
  @MetaModel.inputType('textarea')
  private _body: string;

  @MetaModel.labelKey('User')
  @MetaModel.inputType('select')
  private _user: User;

  [prop: string]: any;
  constructor(id: string, title: string, body: string, user: User) {
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
  set title(title: string) {
    this._title = title;
  }
  get body() {
    return this._body;
  }
  set body(body: string) {
    this._body = body;
  }
  get user() {
    return this._user;
  }
  set user(user: User) {
    this._user = user;
  }
}
