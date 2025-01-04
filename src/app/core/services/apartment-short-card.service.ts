import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApartmentShortCard } from '../models/apartment';
import { Observable } from 'rxjs';
import { RoutesConstants } from '../constants/routes.constants';
import { Pagination } from '../interfaces/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class ApartmentShortCardService {
  constructor(private http: HttpClient) {}

  public getApartmentShortCard(parameters?: {
    pageSize: number;
    pageIndex: number;
  }): Observable<{
    cards: ApartmentShortCard[];
    pagination: Pagination;
  }> {
    let params = new HttpParams();
    if (parameters) {
      params = params.append('pageSize', parameters.pageSize);
      params = params.append('pageIndex', parameters.pageIndex);
    }
    return this.http.get<{
      cards: ApartmentShortCard[];
      pagination: Pagination;
    }>(`/${RoutesConstants.APARTMENT_SHORT_CARDS}`, { params });
  }
}
