import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
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
