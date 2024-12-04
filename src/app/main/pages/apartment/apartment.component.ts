import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from "../../../core/services/data.service";
import {ApartmentFull, ApartmentShortCard} from "../../../core/models/apartment";
import {Gallery} from "../../../core/models/gallery";

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrl: './apartment.component.css'
})


export class ApartmentComponent implements OnInit, AfterViewInit {
  id: string = "";

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
      this.testFillData()
    });
  }

  ngAfterViewInit() {

  }

  showPhone() {
    alert("Phone-number");
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
