import {ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {DataService} from "./data.service";
import { forkJoin, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ApartmentDataResolver implements Resolve<any> {
  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.params['id'];
    const apartment$ = this.dataService.getApartmentFull(id);
    const gallery$ = this.dataService.getApartmentGallery(id)
    return forkJoin({apartment: apartment$, gallery: gallery$})
  }
}
