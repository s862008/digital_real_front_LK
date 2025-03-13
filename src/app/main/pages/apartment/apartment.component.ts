import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import {
  ApartmentFull,
  ApartmentShortCard,
} from '../../../core/models/apartment';
import { Gallery } from '../../../core/models/gallery';
import { BehaviorSubject, Subject, switchMap, takeUntil } from 'rxjs';
import { ApartmentShortCardService } from '../../../core/services/apartment-short-card.service';
import { Pagination } from '../../../core/interfaces/pagination.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrl: './apartment.component.css',
})
export class ApartmentComponent implements OnInit, AfterViewInit, OnDestroy {
  id: string = '';

  imgPathMain!: string;

  public gallery: Gallery[] = [];
  rooms: string = '1 комната';
  public houseTypes: string[] = [
    'Кирпичный',
    'Монолитный',
    'Панельный',
    'Кирпично-монолитный',
    'Блочный',
    'Другой',
  ];
  public cards: ApartmentShortCard[] = [];
  public apartment!: ApartmentFull;
  map!: string;
  loading: boolean = true;

  public pagination: Pagination | undefined;

  private destroy$ = new Subject<void>();
  private paginationSubject$ = new BehaviorSubject<{
    pageSize: number;
    pageIndex: number;
  }>({ pageSize: 10, pageIndex: 0 });

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private apartmentShortCardService: ApartmentShortCardService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.id = params.get('id') || '';
      this.testFillData();
    });

    this.paginationSubject$
      .asObservable()
      .pipe(
        takeUntil(this.destroy$),
        switchMap((item) => {
          return this.apartmentShortCardService.getApartmentShortCard(item);
        })
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        this.cards = v.cards;
        this.pagination = v.pagination;
      });
  }

  ngAfterViewInit() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showPhone() {
    alert('Phone-number');
  }

  public handlePageEvent(event: PageEvent) {
    this.paginationSubject$.next({
      pageSize: event.pageSize,
      pageIndex: event.pageIndex,
    });
  }

  private testFillData() {
    this.apartment = {
      id: BigInt(1),
      photoMainPath: '/assets/img/image 2.png',
      photoDefaultPath: `/assets/img/image 2.png`,
      apartmentNumber: 101,
      apartmentInfo: 'Уютная квартира с видом на парк.',
      entrance: 1,
      layoutType:2,
      numberOfFloorsPerEnt: 5,
      areaTotal: 75,
      areaKitchen: 15,
      areaLiving: 30,
      percent: 10,
      phone: '+7 (999) 123-45-67',
      priceAfterFormat: '5 000 000 ₽',
      priceSqmtAfterFormat: '66 667 ₽/м²',
      webHref: '/apartments/1',
      tags: 'новостройка, центр, с ремонтом',
      countView: BigInt(250),
      status: 'available',
      statusInfo: 'Квартира доступна для продажи',
      article: 'APT-101',
      numberOfRooms: 3,
      price: BigInt(5000000),
      balcony: 'есть',
      priceSqmt: BigInt(66667),
      floor: 3,
      viewFromWindows:2,
      apartmentType: 1,
      roof: 'плоская',
      height_roof: '2.8 м',
      company: 'СтройГрупп',
      rcomplexDto: {
        name: "Жилой комплекс 'Солнечный'",
        ceilingHeight: 2.7,
        id: BigInt(1001),
        address: 'г. Москва, ул. Солнечная, д. 1',
        type_build: 'монолит',
        dueYear: '2023',
        dueQuart: 4,
        parking: 'подземная',
        info: 'Современный жилой комплекс с развитой инфраструктурой.Дом комфорт-класса Жилой дом «Оптимист» - это яркий архитектурный проект компании «Стэл-инвест» в Советском районе Воронежа. Сложная геометрия фасадов и разнообразное сочетание материалов: стекло, бетон, керамический кирпич, дерево, - выделяют проект из общего окружения и обеспечивают полное соответствие современному градостроительству. В проекте сочетаются лучшие технологии кирпичного домостроения и современной инженерии. В современных условиях жизни, когда человека окружает бесконечный стресс и всем приходится куда-то торопиться, многие забывают заботиться о своем здоровье. А поддерживать его не так сложно. Для этого достаточно проводить чуть больше времени на свежем незагрязненном воздухе.',
        houseType: 1,
      },
    };

    this.imgPathMain = '/assets/img/image 8.png';

    this.loading = false;
  }
}
