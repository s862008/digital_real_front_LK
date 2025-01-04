import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ApartmentShortCard } from '../../../core/models/apartment';
import { DataService } from '../../../core/services/data.service';
import {
  ApartmentFilterSearch,
  FilterSearch,
} from '../../../core/models/search';
import { FilterService } from '../../../core/services/filter.service';
import { FormControl } from '@angular/forms';
import { ApartmentShortCardService } from '../../../core/services/apartment-short-card.service';
import { BehaviorSubject, Subject, switchMap, takeUntil } from 'rxjs';
import { Pagination } from '../../../core/interfaces/pagination.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrl: './filter-search.component.css',
})
export class FilterSearchComponent implements OnInit, OnDestroy {
  public toSearch!: ApartmentFilterSearch;
  public srok: string = '10.10.2024';
  public apartments: ApartmentShortCard[] = [];
  public filter!: FilterSearch;
  public countForBtn: string = '';
  public totalPages!: number;
  public totalElements!: number;
  public pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  public size: number = 10;
  public page: number = 0;
  formControl = new FormControl('');
  loading: boolean = false;
  isApartmen: boolean = true;

  public pagination: Pagination | undefined;

  private destroy$ = new Subject<void>();
  private paginationSubject$ = new BehaviorSubject<{
    pageSize: number;
    pageIndex: number;
  }>({ pageSize: 10, pageIndex: 0 });

  constructor(
    private dataservice: DataService,
    private filterservice: FilterService,
    private apartmentShortCardService: ApartmentShortCardService
  ) {}

  ngOnInit(): void {
    this.filter = this.filterservice.getFilterData();
    if (sessionStorage.getItem('toFilterSearch') == 'submit') {
      this.filterSearch();
      this.testFillData();
    } else {
      window.scroll({
        top: 300,
        left: 0,
        behavior: 'smooth',
      });
    }

    sessionStorage.setItem('toFilterSearch', '');

    this.filterservice.clearFilterData();

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
        this.apartments = v.cards;
        this.pagination = v.pagination;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler() {
    console.log('RELOAD');
  }

  public filterSearch(): void {
    this.loading = true;

    if (this.filter != null) {
      this.toSearch = {
        numberOfRooms: this.filterservice.numberOfRooms(this.filter),
        priceMin: this.filter.priceMin,
        priceMax: this.filter.priceMax,
        areaTotalMin: this.filter.areaTotalMin,
        areaTotalMax: this.filter.areaTotalMax,
      };
    }
  }

  clearSearch() {
    this.filter = this.filterservice.clearFilterData();
  }

  formatRoom(value: number) {
    let rooms = '';
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(value)) {
      rooms = value + '-ком. квартира, ';
    } else if (value == 0) {
      rooms = 'Свободная планировка, ';
    } else if (value == 0.5) {
      rooms = 'Студия, ';
    } else if (value !== Math.floor(value)) {
      rooms = value + '-евро, ';
    } else {
      rooms = 'Многокомнатная квартира, ';
    }

    return rooms;
  }

  formatPrice(num: string) {
    if (!/^\d+$/.test(num)) {
      return 0;
    } else {
      num = num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return num;
    }
  }

  nameApartType(apartmentType: string) {
    if (apartmentType == '1') {
      return 'квартира';
    } else return 'апартаменты';
  }

  public handlePageEvent(event: PageEvent) {
    this.paginationSubject$.next({
      pageSize: event.pageSize,
      pageIndex: event.pageIndex,
    });
  }

  private testFillData() {
    this.loading = false;
  }
}
