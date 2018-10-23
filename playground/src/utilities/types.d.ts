import { string } from 'prop-types';

export interface RouterParams {
  id: string;
  [key: string]: string;
}
