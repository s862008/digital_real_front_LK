import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class NewsService {
  private httpClient = inject(HttpClient);
  private apiUrp = 'http://localhost:3000';

  constructor() {
  }

  getNewsList(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrp}/news`);
  }

  createNews(news: any) {
    return this.httpClient.post(`${this.apiUrp}/news`, {...news});
  }

  getNews(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrp}/news/${id}`);
  }

  updateNews(id: string, news: any) {
    return this.httpClient.put(`${this.apiUrp}/news/${id}`, news);
  }

  deleteNews(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrp}/news/${id}`);
  }
}
