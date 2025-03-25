import {Component, EventEmitter, Output, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {HttpClient, HttpEventType, HttpHeaders} from "@angular/common/http";
import { v4 as uuidv4 } from 'uuid';
import {ApartmentFull} from "../../../core/models/apartment";


@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.css'],
})
export class EditingComponent {

  public  apartmentId: string ='207'
  public apartment!: ApartmentFull;
  public listing ;
  constructor(private route: ActivatedRoute, private http: HttpClient, private sanitizer: DomSanitizer) {

    // this.route.params.subscribe(params => {
    //   this.apartmentId = params['apartmentId']; // Получаем ID из URL
    // });

    this.listing = [
      { id: '207',
        title: '',
        address:
          'Новостройка, ЖК «Шестое чувство», ул. Композитора Ставонина, 55/9к2',
        kitchen: 'Кухня: . . . . . . . . . . . . . . . . 13.8 м²',
        floor: 'Этаж: . . . . . . . . . . . . . . . . 6',
        deadline: 'Срок сдачи: . . . . . . . . . . сдан',
        price: 'Не указана',
        img: '../../../../assets/img/house.png', // Заглушка для изображения
      },
    ];
  }
  @Output() galleryChange = new EventEmitter<any[]>();
  public gallery = signal<Gallery[]>([]);
  public imgPathMain = signal<string>('');
  selectedFile: File | null = null;
  imageUrl: SafeUrl = '';
  uploading: boolean = false;
  isSubmitting:boolean = false;
  uploadProgress: number = 0;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    // Загрузите данные аппартаментов
    this.http.get(`/api/v1/apartments/full/207`).subscribe({

      next: (data: any): void => {

        this.apartment = data;
        console.log(data)
        this.listing = [
          { id: '207',
            title:  this.apartment.numberOfRooms + `${this.apartment.areaTotal} м²`,
            address:
              'Новостройка, ЖК «Шестое чувство», ул. Композитора Ставонина, 55/9к2',
            kitchen: 'Кухня: . . . . . . . . . . . . . . . . 13.8 м²',
            floor: 'Этаж: . . . . . . . . . . . . . . . . 6',
            deadline: 'Срок сдачи: . . . . . . . . . . сдан',
            price: 'Не указана',
            img: '../../../../assets/img/house.png', // Заглушка для изображения
          },
        ];
        this.numberOfRooms.set(this.apartment.numberOfRooms ?? 1);
        // this.apartment.apartmentType = FormatterUtils.nameApartType(this.apartment.apartmentType);
        // this.apartment.rcomplexDto.type_build = FormatterUtils.nameHouseType(this.apartment.rcomplexDto.houseType);
        // this.apartment.priceAfterFormat = FormatterUtils.formatPrice(this.apartment.price) || '';
        // this.apartment.priceSqmtAfterFormat = FormatterUtils.formatPrice(this.apartment.priceSqmt)|| '';

      },
      error: (err) => {

        console.error(err);

      }
    });

    this.loadGallery()


  }

  loadGallery(){
    this.http.get<Gallery[]>(`/api/v1/apartments/gallery/207`).subscribe(data => {
      console.log(data)
      if (data) {
        this.gallery.set(data);

        this.imgPathMain.set(this.gallery().length > 0 ?
          (this.gallery()[0].photoPath || this.gallery()[0].planningPath || "") : "");
      }
    });
  }

  removePhoto(index: number) {
    this.gallery().splice(index, 1);
    console.log(this.gallery()[index].id);



    const url = `/test/delete/${this.gallery()[index].photoPath}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer your_token_here', // Замените на ваш токен
      // Вы можете добавить здесь другие заголовки, если нужно
    });
    this.http.delete(url,{ headers }).subscribe(
      () => console.log('файл успешно удален'),
      (error) => console.error('Ошибка при удалении', error)
    );

   // this.updateOrder();
    this.galleryChange.emit(this.gallery());
  }

  movePhoto(fromIndex: number, toIndex: number) {
    const photo = this.gallery().splice(fromIndex, 1)[0];
    this.gallery().splice(toIndex, 0, photo);

    this.updateOrder();
 //   this.saveOrderToServer();
    console.log(this.gallery())
    console.log(this.imgPathMain())
    this.galleryChange.emit(this.gallery());
  }

  updateOrder(): void {
    this.gallery().forEach((item, index) => {
      item.order = index + 1; // Порядок начинается с 1
    });
  }


  saveOrderToServer(): void {
    const url = `/test/apartment/${this.apartmentId}/gallery/update-order`;
    this.http.post(url, this.gallery()).subscribe(
      () => console.log('Порядок успешно обновлён'),
      (error) => console.error('Ошибка при обновлении порядка', error)
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      if (!this.validateFile(this.selectedFile)) {
        alert('Недопустимый формат файла или размер превышает 10MB');
        this.selectedFile=null;
        return;
      }
      // Предварительный просмотр (опционально)
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(e.target.result); // Преобразуем в SafeUrl
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  validateFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    return allowedTypes.includes(file.type) && file.size <= maxSize;
  }

  onUpload(): void {
    if (!this.selectedFile) {
      return;
    }
    this.uploading = true;
    this.uploadProgress = 0;

    const formData = new FormData();
    let filename: string;
    // const filename: string = "a"+this.listing[0].id+"__"+uuidv4()+"."+this.selectedFile.type.split("/").pop()

    if (this.listing[0].id) {
      filename = "a" + this.listing[0].id

      formData.append('image', this.selectedFile, filename);
    }



    this.http.post<ImageUploadResponse>('/test/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((100 * event.loaded) / (event.total || 100)); // Вычисляем прогресс
        } else if (event.type === HttpEventType.Response) {
          this.uploading = false;
          console.log('Upload successful', event.body);
          // Обновляем imageUrl (предполагаем, что сервер возвращает URL)
         if(event.body)
          this.imageUrl = event.body.imageUrl
        }
          this.loadGallery()
      }, error => {
        this.uploading = false;
        alert((error as Error).message)
        console.error('Upload error', error);
      });

  }

  async onSubmit(): Promise<void> {

    this.isSubmitting = true;
    try {

    } finally {
      this.isSubmitting = false;
    }
  }

  onNumberOfRoomsChange(value: number) {
    // Если значение больше или равно 5, устанавливаем его равным 5
    if (value> 5) {
      this.numberOfRooms.set(5);
    } else {
      this.numberOfRooms.set(value);

    }

  }



  apartmentType: string | undefined;
  layoutType: string | undefined;
  floorNumber: string | undefined;
  totalFloors: string | undefined;
  numberOfRooms = signal<number>(1);
  viewFromWindow: string | undefined;
  balconyType: string | undefined;
  stoveType: string | undefined;
  bathroomType: string | undefined;
  finishingType: string | undefined;
  wallFinishing: string | undefined;
  ceilingFinishing: string | undefined;
  floorCovering: string | undefined;
  repairType: string | undefined;
  balconyGlazing: string | undefined;
  bathroomFinishing: string | undefined;
  radiatorType: string | undefined;
  houseType: string | undefined;
  digitalizationClass: string | undefined;
  seismicResistance: string | undefined;
  deliveryYearStart: string | undefined;
  deliveryYearEnd: string | undefined;
  isHouseDelivered: boolean = false;
  ceilingHeight: string | undefined;
  numberOfLifts: string | undefined;
  isSmartHouse: boolean = false;
  isNotSmartHouse: boolean = false;
  apartmentsPerFloorStart: string | undefined;
  apartmentsPerFloorEnd: string | undefined;
  liftType: string | undefined;
  hasOwnBoilerRoom: boolean = false;
  hasNotOwnBoilerRoom: boolean = false;
  isNearbyTC: boolean = false;
  isNearbyFitness: boolean = false;
  isNearbyPark: boolean = false;
  isNearbySchool: boolean = false;
  isNearbyKindergarten: boolean = false;
  isNearbyPolyclinic: boolean = false;
  isNearbyBusStop: boolean = false;
  isNearbyCarService: boolean = false;
  isClosedYard: boolean = false;
  isNotClosedYard: boolean = false;
  isFurnitureWithout: boolean = false;
  isFurnitureInKitchen: boolean = false;
  isFurnitureInApartment: boolean = false;
  isParkingUnderground: boolean = false;
  isParkingMultilevel: boolean = false;
  isParkingOpenYard: boolean = false;
  isParkingClosedTerritory: boolean = false;
  saleMethod: string | undefined;
  hasApartmentGuarantee: boolean = false;
  hasNotApartmentGuarantee: boolean = false;
  isBookingOnline: boolean = false;
  isNotBookingOnline: boolean = false;
  isElectronicDeal: boolean = false;
  isNotElectronicDeal: boolean = false;
  hasPromo: boolean = false;
  hasNotPromo: boolean = false;
  isMortgageAvailable: boolean = false;
  isNotMortgageAvailable: boolean = false;
}


interface ImageUploadResponse {
  imageUrl: string;
  // Другие поля, которые возвращает бэкенд
}

interface Gallery {
  apartmentsId: bigint
  id: bigint
  order:number
  photoPath: string
  planningPath: string
}
