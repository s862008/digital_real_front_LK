import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  delay,
  dematerialize,
  materialize,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { ApartmentShortCard } from '../models/apartment';
import { RoutesConstants } from '../constants/routes.constants';
import { Pagination } from '../interfaces/pagination.interface';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRoute(req, next);
  }

  private handleRoute(req: HttpRequest<any>, next: HttpHandler) {
    const { url, method, headers, body, params } = req;
    const apartmentShortCards = new RegExp(
      `${RoutesConstants.APARTMENT_SHORT_CARDS}`,
      'g'
    );
    switch (true) {
      case url.match(apartmentShortCards) && method == 'GET':
        return this.getApartmentShortCards(params);
      default:
        return next.handle(req);
    }
  }

  private getApartmentShortCards(params: HttpParams) {
    let pagination: Pagination = {
      length: 100,
      pageSize: 10,
      pageIndex: 0,
    };

    if (params.get('pageSize') !== null) {
      pagination.pageSize = Number(params.get('pageSize'));
    }

    if (params.get('pageIndex') != null) {
      pagination.pageIndex = Number(params.get('pageIndex'));
    }

    const randomCompanies = [
      'Строительная компания A',
      'Строительная компания B',
      'Строительная компания C',
      'Company D',
      'Company E',
    ];

    const cards: ApartmentShortCard[] = [];

    for (let index = 0; index < 10; index++) {
      const a: ApartmentShortCard = {
        id: BigInt(1),
        photoDefaultPath: `/assets/img/image 2.png`,
        photoMainPath: `/assets/img/image 2.png`,
        apartmentNumber: Math.floor(Math.random() * 100) + 1,
        apartmentInfo: 'Краткое описание квартиры',
        entrance: Math.floor(Math.random() * 5) + 1,
        numberOfFloorsPerEnt: Math.floor(Math.random() * 10) + 1,
        areaTotal: Math.floor(Math.random() * 100) + 30,
        areaKitchen: Math.floor(Math.random() * 30) + 10,
        areaLiving: Math.floor(Math.random() * 50) + 20,
        percent: Math.floor(Math.random() * 100),
        phone: `+7 900 ${Math.floor(Math.random() * 10000)}`,
        priceAfterFormat: `${Math.floor(Math.random() * 1000000 + 500000)} `,
        priceSqmtAfterFormat: `${Math.floor(Math.random() * 10000 + 30000)} `,
        webHref: `/apartment/${1}`,
        tags: 'новостройка, центр',
        countView: BigInt(Math.floor(Math.random() * 1000)),
        status: 'Доступно',
        statusInfo: 'Квартира свободна',
        article: `ART-${1}`,
        numberOfRooms: Math.floor(Math.random() * 5) + 1,
        price: BigInt(Math.floor(Math.random() * 1000000 + 500000)),
        priceSqmt: BigInt(Math.floor(Math.random() * 10000 + 30000)),
        floor: Math.floor(Math.random() * 10) + 1,
        apartmentType: 'Квартира',
        dueYear: '2023',
        dueQuart: Math.floor(Math.random() * 4) + 1,
        houseType: Math.floor(Math.random() * 3),
        address: `Город, Улица ${Math.floor(Math.random() * 100)}`,
        company:
          randomCompanies[Math.floor(Math.random() * randomCompanies.length)],
        companyId: Math.floor(Math.random() * 100),
      };

      cards.push(a);
    }

    return this.ok({ cards, pagination });
  }

  private ok(body?: any) {
    return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
  }

  private error(message: string) {
    return throwError(() => ({ error: message })).pipe(
      materialize(),
      delay(500),
      dematerialize()
    );
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
