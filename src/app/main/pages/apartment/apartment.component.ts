import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from "../../../core/services/data.service";
import {Apartment, ApartmentFull, ApartmentShortCard} from "../../../core/models/apartment";
import {Gallery} from "../../../core/models/gallery";

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrl: './apartment.component.css'
})


export class ApartmentComponent implements OnInit, AfterViewInit {
  id: string = ""; // Переменная для хранения параметра

  imgPathMain!: string;

  public gallery: Gallery[] = [];
  rooms: string = "1 комната";
  public houseTypes: string[] = ["Кирпичный", "Монолитный", "Панельный", "Кирпично-монолитный", "Блочный", "Другой"];
  public cards: ApartmentShortCard[] = [];
  public apartment!: ApartmentFull;
  map!: string;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private dataService: DataService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
      // this.testFillData()

      this.loadApartmentData();
      this.loadApartmentGallery();
      this.loadRComplexMap();
      this.loadSimilarApartments();
    });
  }

  private loadApartmentData(): void {
// через резолвер
    this.route.data.subscribe(data => {
      this.apartment = data['data']['apartment'];
      this.rooms = this.getRoomDescription(this.apartment.numberOfRooms) + `${this.apartment.areaTotal} м²`;
      this.apartment.apartmentType = this.getApartmentType(this.apartment.apartmentType);
      this.apartment.rcomplexDto.type_build = this.getHouseTypeName(this.apartment.rcomplexDto.houseType);
      this.loading = false;
    });

// прямая загрузка
    // this.dataService.getApartmentFull(this.id).subscribe({
    //   next: (data: any): void => {
    //     this.apartment = data;
    //     this.rooms = this.getRoomDescription(this.apartment.numberOfRooms) + `${this.apartment.areaTotal} м²`;
    //     this.apartment.apartmentType = this.getApartmentType(this.apartment.apartmentType);
    //     this.apartment.rcomplexDto.type_build = this.getHouseTypeName(this.apartment.rcomplexDto.houseType);
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.loading = false;
    //   }
    // });
  }

  private getRoomDescription(numberOfRooms: number): string {
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(numberOfRooms)) {
      return `${numberOfRooms}-ком. квартира, `;
    } else if (numberOfRooms === 0) {
      return "Свободная планировка, ";
    } else if (numberOfRooms === 0.5) {
      return "Студия, ";
    } else if (numberOfRooms !== Math.floor(numberOfRooms)) {
      return `${numberOfRooms}-евро, `;
    } else {
      return "Многокомнатная квартира, ";
    }
  }

  private getApartmentType(type: string): string {
    return type === '1' ? 'квартира' : 'апартаменты';
  }

  private loadApartmentGallery(): void {
// через резолвер
    this.route.data.subscribe(data => {
      if (data) {
        this.gallery = data['data']['gallery'];
        this.imgPathMain = this.gallery.length > 0 ?
          (this.gallery[0].photoPath || this.gallery[0].planningPath || "") : "";
      }
    });

//прямая загрузка
    // this.dataService.getApartmentGallery(this.id).subscribe(data => {
    //   if (data) {
    //     this.gallery = data;
    //     this.imgPathMain = this.gallery.length > 0 ?
    //       (this.gallery[0].photoPath || this.gallery[0].planningPath || "") : "";
    //   }
    // });
  }

  private loadRComplexMap(): void {
    this.dataService.getRComplexMap(this.id).subscribe(data => {
      this.map = data || 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A283ed7ea9cee5f0e727420e71e009a734674a95319ada07b9054a2a4e9db6a04&width=634&height=250&lang=ru_RU&scroll=true';
    });
  }

  private loadSimilarApartments(): void {
    this.dataService.searchSimillarApartments(this.id).subscribe({
      next: (data: any): void => {
        this.cards = data;
        this.correctStyleIndicators();
      }
    });
  }

  ngAfterViewInit() {

    setTimeout(() => {
      //  this.loadScript();
    }, 1000);

  }

  showPhone() {
    alert("Phone-number");
  }

  getHouseTypeName(houseType: number): string {
    if (this.houseTypes != null && this.houseTypes.length >= houseType) {
      return this.houseTypes[houseType - 1];
    }
    return "";

  }

  private correctStyleIndicators() {
    // const carouselIndicators = document.getElementsByClassName("carousel-indicators ng-star-inserted")[0] as HTMLElement;
    // carouselIndicators.style.left = "35%";
  }

  loadScript() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = this.map;
    script.async = true;

    const mapblock = document.getElementById("map");
    if (mapblock != null) {
      mapblock.innerHTML = '';
      mapblock.appendChild(script);
      script.onload = () => {
        console.log("Script loaded successfully");
      };

      script.onerror = () => {
        console.error("Error loading script");
      };
    }
  }

  private testFillData() {


    const randomCompanies = ['Строительная компания A', 'Строительная компания B', 'Строительная компания C', 'Company D', 'Company E'];


    for (let i = 0; i < 10; i++) {

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
        company: randomCompanies[Math.floor(Math.random() * randomCompanies.length)],
        companyId: Math.floor(Math.random() * 100)
      };

      this.cards.push(a);
    }

    this.apartment = {
      id: BigInt(1),
      photoMainPath: "/assets/img/image 2.png",
      photoDefaultPath: `/assets/img/image 2.png`,
      apartmentNumber: 101,
      apartmentInfo: "Уютная квартира с видом на парк.",
      entrance: 1,
      numberOfFloorsPerEnt: 5,
      areaTotal: 75,
      areaKitchen: 15,
      areaLiving: 30,
      percent: 10,
      phone: "+7 (999) 123-45-67",
      priceAfterFormat: "5 000 000 ₽",
      priceSqmtAfterFormat: "66 667 ₽/м²",
      webHref: "/apartments/1",
      tags: "новостройка, центр, с ремонтом",
      countView: BigInt(250),
      status: "available",
      statusInfo: "Квартира доступна для продажи",
      article: "APT-101",
      numberOfRooms: 3,
      price: BigInt(5000000),
      balcony: "есть",
      priceSqmt: BigInt(66667),
      floor: 3,
      apartmentType: "стандарт",
      roof: "плоская",
      height_roof: "2.8 м",
      company: "СтройГрупп",
      rcomplexDto: {
        name: "Жилой комплекс 'Солнечный'",
        ceilingHeight: 2.7,
        id: BigInt(1001),
        address: "г. Москва, ул. Солнечная, д. 1",
        type_build: "монолит",
        dueYear: "2023",
        dueQuart: 4,
        parking: "подземная",
        info: "Современный жилой комплекс с развитой инфраструктурой.Дом комфорт-класса Жилой дом «Оптимист» - это яркий архитектурный проект компании «Стэл-инвест» в Советском районе Воронежа. Сложная геометрия фасадов и разнообразное сочетание материалов: стекло, бетон, керамический кирпич, дерево, - выделяют проект из общего окружения и обеспечивают полное соответствие современному градостроительству. В проекте сочетаются лучшие технологии кирпичного домостроения и современной инженерии. В современных условиях жизни, когда человека окружает бесконечный стресс и всем приходится куда-то торопиться, многие забывают заботиться о своем здоровье. А поддерживать его не так сложно. Для этого достаточно проводить чуть больше времени на свежем незагрязненном воздухе.",
        houseType: 1,
      }
    };

    this.imgPathMain = "/assets/img/image 8.png"

    this.loading = false;
  }
}
