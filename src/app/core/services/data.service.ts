import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {ApartmentFilterSearch, SmartSearch} from "../models/search";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  public getApartmentFull(id: string): Observable<any> {
    return this.http.get(`/api/v1/apartments/full/${id}`);
  }

  public search(toSearch: ApartmentFilterSearch, size: number, page: number): Observable<Object> {
    return this.http.post(`/api/v1/apartments/all?size=${size}&page=${page}`, toSearch);
  }

  public smartSearch(toSearch: SmartSearch, size: number, page: number): Observable<Object>  {
    return this.http.post(`/api/v1/apartments/smart-search?size=${size}&page=${page}`, toSearch);
  }

  public loadPrepearInfo(toSearch: ApartmentFilterSearch): Observable<Object> {
    return this.http.post(`/api/v1/apartments/count`, toSearch);
  }

  public getApartmentGallery(id: string): Observable<any> {
    return this.http.get(`/api/v1/apartments/gallery/${id}`);
  }

  public getRComplex(param: { method: string; limit: number; id: number }): Observable<any> {
    if (param.method == "popular")
      return this.http.get(`/api/v1/rcomplex/popular`);
    if (param.method == "suggest")
      return this.http.get(`/api/v1/rcomplex/suggest`);
    if (param.method == "findByid")
      return this.http.get(`/api/v1/rcomplex/${param.id}`);

    return of('');
  }

  public getRComplexMap(id: string) : Observable<any> {
    return this.http.get(`/api/v1/apartments/map/${id}`);
  }

  //---------------------------------------------------

  getData(id: string): Observable<any> {
    return this.http.get('/test/cnt');
  }

  public getApartment(id: string): Observable<Object> {

    return this.http.get(`/test/apart/${id}`);
  }

  public searchSimillarApartments(id: string): Observable<Object> {

    return this.http.get(`/test/aparts/${id}`);
  }

  //---------------------------------------------------


}
