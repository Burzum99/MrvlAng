import { HeroComic } from './hero-comic.model';

export interface HeroComics {
  available: number;
  collectionURI: string;
  items: HeroComic[];
}
