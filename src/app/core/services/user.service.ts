import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProfileForm} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly http: HttpClient) {
  }

  public getProfile(username: string): Observable<Object> {
    return this.http.get(`/api/v1/users/find-by-username/${username}`);
  }

  public updateProfile(toUpdate: ProfileForm): Observable<Object> {
    return this.http.put(`/api/v1/users/`, toUpdate);
  }

  public deleteProfile(username: string): Observable<Object> {
    return this.http.delete(`/api/v1/users/delete-by-username/${username}`);
  }

}
