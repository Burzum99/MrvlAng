import { MarvelList } from './data-list.model';

export interface MarvelResponse<T> {
  code: number;
  status: string;
  attributionHTML: string;
  data: MarvelList<T>;
}
