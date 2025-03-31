import {Component, EventEmitter, OnInit, Output, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApartmentFull} from '../../../core/models/apartment';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RComplex} from "../../../core/models/rcomplex";


class DataService {
  private apiUrl = '/api/v1/apartments';

  constructor(private http: HttpClient) {
  }

  createApartment(apartment: ApartmentFull): Observable<ApartmentFull> {
    return this.http.post<ApartmentFull>(`${this.apiUrl}/`, apartment);
  }

  uploadPhotos(apartmentId: bigint, files: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${apartmentId}/upload-photos`, files);
  }

  getResidentialComplexes(): Observable<RComplex[]> {
    return this.http.get<RComplex[]>('/api/v1/rcomplex/private/company');
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
  public photos: { file: File; url: string; order: number }[] = [];
  public dataService: DataService;
  isSubmitting = false;
  residentialComplexes: RComplex[] = [];
  selectedComplex: string = '';
  isDragOver = false;
  @Output() galleryChange = new EventEmitter<any[]>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.dataService = new DataService(http);
  }

  ngOnInit(): void {
    this.addType = this.route.snapshot.data['type'];
    console.log('Received data:', this.addType);

    if (this.addType === 'addApart') {
      this.loadResidentialComplexes();
      this.apartment = this.createEmptyApartment();
    }

  }

  onFileSelected(event: any) {
    this.handleFiles(event.target.files);
  }

  private handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.photos.push({file, url: e.target.result, order: this.photos.length + 1});
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // Обработчик перетаскивания файлов
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  // Обработчик события dragover
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  // Обработчик события dragleave
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  uploadPhotos(apartmentId: bigint): void {
    if (this.photos.length === 0) return;

    const formData = new FormData();
    this.photos.forEach((photo) => {
      formData.append('photos', photo.file);
    });

    this.dataService.uploadPhotos(apartmentId, formData).subscribe({
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
    this.updateOrder();
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

  async onSubmit(): Promise<void> {
    console.log(this.apartment)
    console.log(this.photos)
    this.isSubmitting = true;
    this.apartment.rcomplexDto.id=1;
    try {
      this.dataService.createApartment(this.apartment).subscribe({
        next: (response) => {

          if (response.id) {
            console.log('Квартира успешно создана:', response);
            this.uploadPhotos(response.id);
            this.router.navigate(['/editing', response.id])
              .then(() => {
                alert('Квартира успешно создана и перенаправляем на страницу редактирования');
              });
          }

        },
        error: (error) => {
          console.error('Ошибка при создании квартиры:', error);
          alert('Ошибка при создании квартиры: ' + error.message);
        },
      });
    } finally {
      this.isSubmitting = false;
    }
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

