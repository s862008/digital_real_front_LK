import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginForm, RegistrationForm} from "../models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;

  constructor(private readonly http: HttpClient,
              private readonly router: Router) {
  }

  /**
   * Установить refresh токен
   * @param refreshToken refresh токен
   * @private
   */
  private setRefreshToken(refreshToken: string): void {
    localStorage.setItem("refresh_token", refreshToken);
  }

  /**
   * Получить refresh токен
   */
  public getRefreshToken(): string {
    let refreshToken: string | null = localStorage.getItem("refresh_token");
    if (refreshToken == null) {
      this.logout();
      return '';
    }
    return refreshToken;
  }

  /**
   * Возвращает username пользователя
   */
  public getUsername(): string {
    let username: string | null = localStorage.getItem("username");
    if (username == null) {
      this.logout();
      return '';
    }
    return username;
  }

  /**
   * Установить access токен
   * @param accessToken access токен
   * @private
   */
  setAccessToken(accessToken: string): void {
    localStorage.setItem("access_token", accessToken);
    this.isLoggedIn = true;
  }

  setUsername(username: string): void {
    localStorage.setItem("username", username);
  }

  /**
   * Получить access токен
   */
  public getAccessToken(): string {
    let accessToken = localStorage.getItem("access_token");
    if (accessToken == null)
      return '';
    return accessToken;
  }

  /**
   * Установить время, когда действия токена истекает
   * @param expiresAt время, когда истекает действия токена
   * @private
   */
  private setAccessTokenExpiresAt(expiresAt: string): void {
    localStorage.setItem("expires_at", expiresAt);
  }

  /**
   * Получить время, когда действия токена истекает
   * @private
   */
  private getAccessTokenExpiresAt(): number {
    let expiresAt = localStorage.getItem("expires_at");
    if (expiresAt == null)
      return 0;
    return Number(expiresAt);
  }

  public isAuthorized(): boolean {
    return  this.isLoggedIn || !!this.getAccessToken() ;
  }

  checkSession(): boolean {
    const token = this.getAccessToken();
    const username = this.getUsername();
// Здесь можно добавить проверку токена (например, его срок действия)
    return !!token; // Возвращает true, если токен существует
  }

  /**
   * Регистрация пользователя
   * @param form форма регистрации для отправки на сервер
   */
  public registration(form: RegistrationForm): Observable<any> {
    return this.http.post('/api/v1/auth/register', form)
  }

  /**
   * Авторизация пользователя
   * @param form форма авторизации для отправки на сервер
   */
  public login(form: LoginForm): Observable<any> {
    return this.http.post('/api/v1/auth/authenticate', form)
  }

  public logout(): void {
    this.setAccessToken('')
    this.setRefreshToken('')
    this.setUsername('')
    this.isLoggedIn = false;
    this.router.navigate(['/']).then()
  }
}
