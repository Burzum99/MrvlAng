import { md5 } from './md5.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../Models/character.model';
import { MarvelResponse } from '../Models/response.model';
import { Comic } from '../Models/comic.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  private baseUrl  = 'https://gateway.marvel.com:443/v1/public/';
  // Main Key
  // private publicKey  = 'eb2411e7eff95c104ba629f55e0dac3e';
  // private privateKey  = '74fc56a6bb90501146a88bbfb78ebc19d386f380';

  // Alternative keys
  private publicKey  = 'cdf0b32269299cd8fdc60ef2f5ba8ff4';
  private privateKey  = '3405c1236802253a81ff27c034e53888435fcb37';
  constructor(private http: HttpClient) {
  }
  public getHeroes( pageSize: number , pageIndex: number ): Observable<MarvelResponse<Character>> {
    let offset: number;
    offset = (pageIndex !== 0) ? (pageIndex) * pageSize : 0;

    const ts = new Date().getTime();
    const hash = this.generateHash(ts);
    const requestUrl = `${this.baseUrl}characters?ts=${ts}&apikey=${this.publicKey}&hash=${hash}&limit=${pageSize}&offset=${offset}`;
    console.log(requestUrl);
    return this.http.get<MarvelResponse<Character>>(requestUrl);
  }

  public  getOrderedHeroes(orderCriteria: string): Observable<MarvelResponse<Character>> {
    const ts = new Date().getTime();
    const hash = this.generateHash(ts);
    const requestUrl = `${this.baseUrl}characters?orderBy=${orderCriteria}&ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;
    return this.http.get<MarvelResponse<Character>>(requestUrl);
  }

  public getHeroById(id: string): Observable<MarvelResponse<Character>> {
    const ts = new Date().getTime();
    const hash =  this.generateHash(ts);
    const requestUrl = `${this.baseUrl}characters/${id}?ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;
    return this.http.get<MarvelResponse<Character>>(requestUrl);
  }


  public getHeroByName(searchedValue: string): Observable<MarvelResponse<Character>> {
    const ts = new Date().getTime();
    const hash =  this.generateHash(ts);
    searchedValue = JSON.parse(JSON.stringify(searchedValue)).searchedValue;
    const requestUrl = `${this.baseUrl}characters?ts=${ts}&apikey=${this.publicKey}&hash=${hash}&nameStartsWith=${searchedValue}`;
    return this.http.get<MarvelResponse<Character>>(requestUrl);
  }

  public getHerosStartBy(searchedValue: string): Observable<MarvelResponse<Character>> {
    const ts = new Date().getTime();
    const hash = md5( ts + this.privateKey + this.publicKey);
    searchedValue = JSON.parse(JSON.stringify(searchedValue)).searchedValue;
    const requestUrl = `${this.baseUrl}characters?ts=${ts}&apikey=${this.publicKey}&hash=${hash}&nameStartsWith=${searchedValue}`;
    return this.http.get<MarvelResponse<Character>>(requestUrl);
  }

  public getHeroComics(id: number): Observable<MarvelResponse<Comic>> {
    const ts = new Date().getTime();
    const hash = md5( ts + this.privateKey + this.publicKey);
    const requestUrl = `${this.baseUrl}comics?characters=${id}&ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;
    return this.http.get<MarvelResponse<Comic>>(requestUrl);
  }

  public getComic(resourceURI: string): Observable<MarvelResponse<Comic>> {
    const ts = new Date().getTime();
    const hash = this.generateHash(ts);
    const requestUrl = `${resourceURI}?ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;
    return this.http.get<MarvelResponse<Comic>>(requestUrl);
  }

  // Additional methods

  public generateHash(timestamp: number): string {
    const hash = md5( timestamp + this.privateKey + this.publicKey);
    return hash;
  }
}
