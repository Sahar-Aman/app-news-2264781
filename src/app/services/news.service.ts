import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Article, NewsResponse } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const apiKey  = environment.apiKey;
const apiUrl = environment.apiUrl;



@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { } //necesitamos crear una llamada al url que cogimos del apikey
  //pero primero debemos comunicar con el https

  private executeQuery(endpoint:string){
    return this.http.get(`${ apiUrl }${endpoint}` ,{
      params: {apiKey}
    })
  }
  
  getTopHeadlines() : Observable<Article[]> {

    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=business`,
      {
      params :{apiKey}
    }).pipe(
      map(( { articles } )=> articles));
  }

  getTopHeadlinesByCategory(category:string):Observable<Article[]>{

    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=${category}`,{
      params :{apiKey}
    }).pipe(map(( { articles } )=> articles));
  }

  }
  


