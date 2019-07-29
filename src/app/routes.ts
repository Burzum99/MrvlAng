import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { ContentComponent } from './content/content.component';

export const appRoutes = [
  { path: 'characters', component: ContentComponent },
  { path: 'character/:id', component: HeroDetailsComponent },
  { path: '', redirectTo: '/characters', pathMatch: 'full'}
]
