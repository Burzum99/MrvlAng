import { Thumbnail } from './thumbnail.model';

export interface Comic {
  id: number;
  title: string;
  description: string;
  thumbnail: Thumbnail;
  resourceURI: string;
}
