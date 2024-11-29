import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  /**
   * Данный interceptor перехватывает запрос. Добавляет к нему access token и обрабатывает дефолтные ошибки
   * @param request перехваченный запрос
   * @param next следующий перехватчик для обработки ошибок
   */
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestClone = request.clone()
    if (true)
      requestClone = this.addAuthHeader(request);
    return next.handle(requestClone).pipe(catchError(error => {
      return this.handleResponseError(error, request, next);
    }));
  }

  /**
   * Добавляет access token в Header
   * @param request перехваченный запрос
   * @private
   */
  private addAuthHeader(request: HttpRequest<any>) {
    const token = localStorage.getItem('access_token');
    const username= localStorage.getItem('username');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          UserName:`${username}`,
        }
      });
    }

    return request;
  }

  /**
   * Обрабатывает стандартные ошибки
   * @param error ошибка
   * @param request перехваченный запрос
   * @param next следующий перехватчик для обработки ошибок
   * @private
   */
  private handleResponseError(error: any, request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (error.status === 400) {
      //TODO: Add a method implementation
    } else if (error.status === 401) {
      // this.oauthService.initImplicitFlow();
    } else if (error.status === 403) {
      //TODO: Add a method implementation
    } else if (error.status === 500) {
      //TODO: Add a method implementation
    } else if (error.status === 503) {
      //TODO: Add a method implementation
    } else if (error.status === 504) {
      //TODO: Add a method implementation
    }

    return throwError(error);
  }
}

/**
 * Константа для импорта в AppModule
 */
export const authInterceptorProvider = [{
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}];
