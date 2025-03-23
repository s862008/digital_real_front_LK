import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApartmentFull } from '../../../core/models/apartment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


class ApartmentService {
  private apiUrl = '/api/apartment';

  constructor(private http: HttpClient) {}

  createApartment(apartment: ApartmentFull): Observable<ApartmentFull> {
    return this.http.post<ApartmentFull>(`${this.apiUrl}/create`, apartment);
  }

  uploadPhotos(files: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload-photos`, files);
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
  public photos: { file: File; url: string }[] = [];
  public apartmentService : ApartmentService;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {this.apartmentService = new ApartmentService(http);}

  ngOnInit(): void {
    this.addType = this.route.snapshot.data['type'];
    console.log('Received data:', this.addType);

    if (this.addType === 'addApart') {
      this.apartment = this.createEmptyApartment();
    }
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photos.push({ file, url: e.target.result });
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

    this.apartmentService.uploadPhotos(formData).subscribe({
      next: () => console.log('Фотографии успешно загружены'),
      error: (error) => console.error('Ошибка при загрузке фотографий', error),
    });
  }

  onSubmit(): void {
    this.apartmentService.createApartment(this.apartment).subscribe({
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
      apartmentType: null,
      roof: null,
      height_roof: null,
      company: null,
      rcomplexDto: {},
    };
  }
}

