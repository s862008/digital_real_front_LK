import {Component, EventEmitter, OnInit, Output, signal} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApartmentFull } from '../../../core/models/apartment';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RComplex} from "../../../core/models/rcomplex";


class DataService {
  private apiUrl = '/api/apartment';

  constructor(private http: HttpClient) {}

  createApartment(apartment: ApartmentFull): Observable<ApartmentFull> {
    return this.http.post<ApartmentFull>(`${this.apiUrl}/create`, apartment);
  }

  uploadPhotos(files: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload-photos`, files);
  }

  getResidentialComplexes(): Observable<RComplex[]> {
    return this.http.get<RComplex[]>(this.apiUrl);
  }
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  addType: string = '';
  public apartment: ApartmentFull = this.createEmptyApartment();
  public photos: { file: File; url: string; order:number }[] = [];
  public dataService : DataService;
  residentialComplexes: RComplex[] = [];
  selectedComplex: string = '';
  @Output() galleryChange = new EventEmitter<any[]>();
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {this.dataService = new DataService(http);}

  ngOnInit(): void {
    this.addType = this.route.snapshot.data['type'];
    console.log('Received data:', this.addType);

    if (this.addType === 'addApart') {
      this.loadResidentialComplexes();
      this.apartment = this.createEmptyApartment();
    }
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photos.push({ file, url: e.target.result,order: this.photos.length+1 });
      };
      reader.readAsDataURL(file);
    }
    console.log(this.photos);
  }

  uploadPhotos(): void {
    const formData = new FormData();
    this.photos.forEach((photo) => {
      formData.append('photos', photo.file);
    });

    this.dataService.uploadPhotos(formData).subscribe({
      next: () => console.log('Фотографии успешно загружены'),
      error: (error) => console.error('Ошибка при загрузке фотографий', error),
    });
  }

  loadResidentialComplexes(): void {
    this.dataService.getResidentialComplexes().subscribe({
      next: (data) => {
        this.residentialComplexes = data;
      },
      error: (error) => {
        console.error('Ошибка при загрузке списка ЖК:', error);
      },
    });
  }

  removePhoto(index: number) {
    this.photos.splice(index, 1);
    const url = `/test/delete/${this.photos[index].url}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer your_token_here', // Замените на ваш токен
      // Вы можете добавить здесь другие заголовки, если нужно
    });
    this.http.delete(url,{ headers }).subscribe(
      () => console.log('файл успешно удален'),
      (error) => console.error('Ошибка при удалении', error)
    );

    // this.updateOrder();
    this.galleryChange.emit(this.photos);
  }

  movePhoto(fromIndex: number, toIndex: number) {
    const photo = this.photos.splice(fromIndex, 1)[0];
    this.photos.splice(toIndex, 0, photo);

    this.updateOrder();
    this.galleryChange.emit(this.photos);
  }
  updateOrder(): void {
    this.photos.forEach((item, index) => {
      item.order = index + 1; // Порядок начинается с 1
    });
  }

  onSubmit(): void {
    console.log(this.apartment)
    console.log(this.photos)
    this.dataService.createApartment(this.apartment).subscribe({
      next: (response) => {
        console.log('Квартира успешно создана:', response);
        this.uploadPhotos();
      },
      error: (error) => {
        console.error('Ошибка при создании квартиры:', error);
      },
    });
  }

  private createEmptyApartment(): ApartmentFull {
    return {
      id: null,
      photoMainPath: null,
      photoDefaultPath: null,
      apartmentNumber: null,
      apartmentInfo: null,
      entrance: null,
      layoutType: null,
      numberOfFloorsPerEnt: null,
      areaTotal: null,
      areaKitchen: null,
      areaLiving: null,
      percent: null,
      phone: null,
      priceAfterFormat: null,
      priceSqmtAfterFormat: null,
      webHref: null,
      tags: null,
      countView: null,
      status: null,
      statusInfo: null,
      article: null,
      numberOfRooms: 1,
      price: null,
      balcony: null,
      bathroom: null,
      decoration: null,
      decorationWall: null,
      decorationCeiling: null,
      floorCovering: null,
      repairType: null,
      glazing: null,
      isOnlineBooking: null,
      isElectronReg: null,
      isStock: null,
      furniture: null,
      isDecorationBathroom: null,
      priceSqmt: null,
      floor: null,
      viewFromWindows: null,
      apartmentType: 1,
      roof: null,
      height_roof: null,
      company: null,
      rcomplexDto: {},
    };
  }
}

