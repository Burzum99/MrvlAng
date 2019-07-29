import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { HeroStory } from './hero-story';

export interface HeroStories {
  available: number;
  collectionURI: string;
  items: HeroStory[];
  returned: number;
}
