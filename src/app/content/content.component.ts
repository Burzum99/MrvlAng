import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../Services/marvel.service';
import { PageEvent, MatSelectChange, MatDialog } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../Services/data.service';
import { ModalComponent } from '../modal/modal.component';
import { OrderOption } from '../Models/order-option.model';
import { Character } from '../Models/character.model';
import { ModalData } from '../Models/modal-data.model';
import { Comic } from '../Models/comic.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [MarvelService]
})
export class ContentComponent implements OnInit {

  pageSize = 10;
  pageIndex = 0;
  showSidebar = true;
  pageEvent: PageEvent;
  formGroup: FormGroup;
  searchedValue: string;
  length: number = null;
  characters: Character[] = [];
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  orderOptions: OrderOption[] = [
    { orderUrlParameter: 'name', orderType: 'Name' },
    { orderUrlParameter: '-modified', orderType: 'Date' }
  ];
  results: any = [];

  constructor(private marvelApiService: MarvelService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              public dataService: DataService) { }

  async ngOnInit() {
    this.createForm();

    this.formGroup.valueChanges.subscribe((queryField) => {
      if (queryField.searchedValue !== '') {
        this.marvelApiService.getHerosStartBy(queryField).subscribe(data => this.results = data);
      } else {
        const emptyList: any = [];
        this.results = emptyList;
      }
    });

    this.marvelApiService.getHeroes(this.pageSize, this.pageIndex).subscribe((data) => {
      this.length = data.data.total;
      data.data.results.forEach(obj => {
        this.marvelApiService.getHeroComics(obj.id).subscribe((comicResponse) => {
          obj.comics = comicResponse.data.results;
        });
      });
      this.characters = data.data.results;
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      searchedValue: [null, [Validators.required, Validators.maxLength(30)]]
    });
  }

  sidenavtoggle() {
    this.showSidebar = !this.showSidebar;
  }

  public async getHeroes(event?: PageEvent) {

    this.marvelApiService.getHeroes(event.pageSize, event.pageIndex).subscribe((data) => {
      this.length = data.data.total;
      data.data.results.forEach(obj => {
        this.marvelApiService.getHeroComics(obj.id).subscribe((comicResponse) => {
          obj.comics = comicResponse.data.results;
        });
      });
      this.characters = data.data.results;
      return data.data.results;
    });
  }

  public async searchHero(searchedValue: string) {
    this.marvelApiService.getHeroByName(searchedValue).subscribe((data) => {
      this.length = data.data.total;
      data.data.results.forEach(obj => {
        this.marvelApiService.getHeroComics(obj.id).subscribe((comicResponse) => {
          obj.comics = comicResponse.data.results;
        });
      });
      this.characters = data.data.results;
    });
  }

  public async orderResults(event?: MatSelectChange) {
    this.marvelApiService.getOrderedHeroes(event.value).subscribe((data) => {
      this.length = data.data.total;
      data.data.results.forEach(obj => {
        this.marvelApiService.getHeroComics(obj.id).subscribe((comicResponse) => {
          obj.comics = comicResponse.data.results;
        });
      });
      this.characters = data.data.results;
    });
  }

  public async showInfo(selectedComic: Comic) {
    const favoriteComics = this.dataService.getFavoriteComics();
    let isFavorite = false;

    if (favoriteComics.filter(item => item.id === selectedComic.id).length > 0) {
      isFavorite = true;
    }

    const dialogData: ModalData = {
      comic: {
        id: selectedComic.id,
        title: selectedComic.title,
        description: selectedComic.description,
        thumbnail: selectedComic.thumbnail,
        resourceURI: selectedComic.resourceURI
      }, isInFavorites: isFavorite
    };

    this.dialog.open(ModalComponent, {
      width: '800px',
      data: dialogData
    });
  }

}
