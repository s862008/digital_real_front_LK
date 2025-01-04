import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, switchMap, takeUntil } from 'rxjs';
import { ApartmentShortCard } from '../../../core/models/apartment';
import {
  RComplexFull,
  RComplexRandomInstance,
} from '../../../core/models/rcomplex';
import { ApartmentShortCardService } from '../../../core/services/apartment-short-card.service';
import { DataService } from '../../../core/services/data.service';
import { Pagination } from '../../../core/interfaces/pagination.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-r-complex',
  templateUrl: './r-complex.component.html',
  styleUrl: './r-complex.component.css',
})
export class RComplexComponent implements OnInit, OnDestroy {
  public id!: string;
  public apartments: ApartmentShortCard[] = [];
  public rcomplex!: RComplexFull;
  public loading: boolean = true;

  public pagination: Pagination | undefined;

  private destroy$ = new Subject<void>();
  private paginationSubject$ = new BehaviorSubject<{
    pageSize: number;
    pageIndex: number;
  }>({ pageSize: 10, pageIndex: 0 });

  constructor(
    private route: ActivatedRoute,
    private readonly dataservice: DataService,
    private apartmentShortCardService: ApartmentShortCardService
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') || '';
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
        this.apartments = v.cards;
        this.pagination = v.pagination;
      });
    this.testFillData();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public handlePageEvent(event: PageEvent) {
    this.paginationSubject$.next({
      pageSize: event.pageSize,
      pageIndex: event.pageIndex,
    });
  }

  private testFillData() {
    this.rcomplex = new RComplexRandomInstance();
    this.loading = false;
  }
}
