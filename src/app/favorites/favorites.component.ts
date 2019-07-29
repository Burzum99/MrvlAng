import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../Services/data.service';
import { Comic } from '../Models/comic.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteComics: Array<Comic> = [];
  @Input() opened: boolean;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.favoriteComicsUpdated.subscribe(
      (favoriteComics) => {
        this.favoriteComics = this.dataService.getFavoriteComics();
      }
    );
  }

  public async getFavorites(): Promise<Array<Comic>> {
    const favoriteComics = await this.dataService.getFavoriteComics();
    return favoriteComics;
  }

  public async deleteComic(comic: Comic) {
    await this.dataService.deleteFavoriteComic(comic);
  }
}
