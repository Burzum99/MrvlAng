import { Injectable, EventEmitter } from '@angular/core';
import { Comic } from '../Models/comic.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  favoriteComics: Array<Comic> = [];
  favoriteComicsUpdated = new EventEmitter();

  constructor() { }

  public getFavoriteComics(): Array<Comic> {
    return this.favoriteComics;
  }

  public addFavoriteBook(comic: Comic) {
    this.favoriteComics.push(comic);
    this.favoriteComicsUpdated.emit(this.favoriteComics);
  }

  public deleteFavoriteComic(comic: Comic) {
    this.favoriteComics = this.favoriteComics.filter(item => item.id !== comic.id);
    this.favoriteComicsUpdated.emit(this.favoriteComics);
  }
}
