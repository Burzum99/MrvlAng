import { Thumbnail } from './thumbnail.model';
import { HeroComics } from './hero-comics.model';
import { HeroStories } from './hero-stories.model';
import { Comic } from './comic.model';

export interface Character {
  id: number;
  name: string;
  modified: string;
  description: string;
  thumbnail: Thumbnail;
  // comics: HeroComics;
  // stories: HeroStories;
  comics: Comic[];
}
