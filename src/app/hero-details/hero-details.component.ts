import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MarvelService } from '../Services/marvel.service';
import { Character } from '../Models/character.model';
import { of } from 'rxjs';
import { MarvelResponse } from '../Models/response.model';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {
  character: Character;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private marvelApiService: MarvelService) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.marvelApiService.getHeroById(id).subscribe((data) => {
      data.data.results.forEach(obj => {
        this.marvelApiService.getHeroComics(obj.id).subscribe((comicResponse) => {
          obj.comics = comicResponse.data.results;
        });
      });

      this.character = data.data.results[0];
    });
  }
}
