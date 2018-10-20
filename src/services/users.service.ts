import { User } from 'models/User.model';
import axios from 'axios';

export interface UserJSON {
  id: string;
  name: string;
}

export class UsersService {
  static url = 'http://localhost:4200/users';

  static async getUsers(ssr: boolean = false) {
    const resp = await axios.get(`${UsersService.url}`);
    if (ssr) {
      return resp.data;
    }
    return resp.data.map(UsersService.toUser);
  }

  static async getUser(id: string) {
    const resp = await axios.get(`${UsersService.url}/${id}`);
    return UsersService.toUser(resp.data);
  }

  static toUser(user: UserJSON) {
    return new User(user.id, user.name);
  }
}
