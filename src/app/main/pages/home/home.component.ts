import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RComplexPopular } from '../../../core/models/rcomplex';
import {
  ApartmentFilterSearch,
  FilterSearch,
} from '../../../core/models/search';
import { DataService } from '../../../core/services/data.service';
import { FilterService } from '../../../core/services/filter.service';
import { SmartParametersComponent } from '../../components/smart-parameters/smart-parameters.component';
import {
  Statement,
  StatementService,
} from '../../../core/services/statement.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public toSearch?: ApartmentFilterSearch;
  isLoadingVariants = false;
  category: string = 'Категория';
  type: string = 'ТИП';
  cost: number = 10500;
  apartmentCount: number = 34;
  rcomplexCount: string = '14';
  public rcomplexPopulars: RComplexPopular[] = [];
  visibleCards: number = 2;
  currentIndex: number = 0;
  formFilter: FormGroup;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private filterservice: FilterService,
    private readonly dataservice: DataService,
    private statementService: StatementService
  ) {
    this.formFilter = this.fb.group({
      isTwo: [false],
      isThree: [false],
      isFour: [false],
      isAtelier: [false],
      isOne: [false],
      isFivePlus: [false],
      priceMin: '',
      priceMax: '',
      areaTotalMin: '',
      areaTotalMax: '',
      due: [],
    });
  }

  ngAfterViewInit() {
    this.formFilter.valueChanges.subscribe((value) => {
      setTimeout(() => {
        this.loadPrepearInfo();
      });
    });

    this.loadSuggest();
  }

  ngOnInit(): void {
    this.testFillData();
  }

  nextSlide(): void {
    const totalItems = this.rcomplexPopulars.length;
    if (this.currentIndex < totalItems - 2) {
      this.currentIndex += 2;
    } else {
      this.currentIndex = 0;
    }
    this.updateSliderPosition();
  }
  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= 2;
    }
    this.updateSliderPosition();
  }

  updateSliderPosition(): void {
    const slider = document.querySelector('.cards') as HTMLElement;
    const cardWidth = slider.children[0].clientWidth;
    const gap = 20;
    const offset = (cardWidth + gap) * this.currentIndex;

    slider.style.transform = `translateX(-${offset}px)`;
  }

  loadPrepearInfo() {
    this.isLoadingVariants = true;
  }

  public filterSearch(): void {
    let filter: FilterSearch = {
      priceMin: this.formFilter.controls['priceMin'].value,
      priceMax: this.formFilter.controls['priceMax'].value,
      areaTotalMin: this.formFilter.controls['areaTotalMin'].value,
      areaTotalMax: this.formFilter.controls['areaTotalMax'].value,
      isAtelier: this.formFilter.controls['isAtelier'].value,
      isOne: this.formFilter.controls['isOne'].value,
      isTwo: this.formFilter.controls['isTwo'].value,
      isThree: this.formFilter.controls['isThree'].value,
      isFour: this.formFilter.controls['isFour'].value,
      isFivePlus: this.formFilter.controls['isFivePlus'].value,
    };

    this.filterservice.setFilterData(filter);
    sessionStorage.setItem('toFilterSearch', 'submit');
    this.router.navigate(['/filter-search']);
  }

  public submitStatementForm(statement: Statement) {
    this.statementService
      .createStatement(statement)
      .pipe(take(1))
      .subscribe((item) => console.log(item));
  }

  private numberOfRooms(): string[] | null {
    let numberOfRooms: string[] = [];
    if (this.formFilter.controls['isAtelier'].value) {
      numberOfRooms.push('0.5');
    }
    if (this.formFilter.controls['isOne'].value) {
      numberOfRooms.push('0.5');
      numberOfRooms.push('1');
      numberOfRooms.push('1.5');
    }
    if (this.formFilter.controls['isTwo'].value) {
      numberOfRooms.push('2');
      numberOfRooms.push('2.5');
    }
    if (this.formFilter.controls['isThree'].value) {
      numberOfRooms.push('3');
      numberOfRooms.push('3.5');
    }
    if (this.formFilter.controls['isFour'].value) {
      numberOfRooms.push('4');
    }
    if (this.formFilter.controls['isFivePlus'].value) {
      numberOfRooms.push('5');
      numberOfRooms.push('6');
      numberOfRooms.push('7');
      numberOfRooms.push('8');
      numberOfRooms.push('9');
      numberOfRooms.push('10');
    }

    return numberOfRooms.length > 0 ? numberOfRooms : null;
  }

  openDialog() {
    const dialogRef = this.dialog.open(SmartParametersComponent, {
      height: '100%',
      width: '95%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Данные из формы:', result);
      }
    });
  }

  private loadSuggest() {}

  private testFillData() {
    const randomNames = [
      'Complex A',
      'Complex B',
      'Complex C',
      'Complex D',
      'Complex E',
    ];
    const randomAddresses = [
      'Address 1',
      'Address 2',
      'Address 3',
      'Address 4',
      'Address 5',
    ];
    const randomCompanies = [
      'Company A',
      'Company B',
      'Company C',
      'Company D',
      'Company E',
    ];

    for (let i = 0; i < 6; i++) {
      const r: RComplexPopular = {
        address:
          randomAddresses[Math.floor(Math.random() * randomAddresses.length)],
        company:
          randomCompanies[Math.floor(Math.random() * randomCompanies.length)],
        id: BigInt(i + 1),
        name: randomNames[Math.floor(Math.random() * randomNames.length)],
        orderByRooms: Math.floor(Math.random() * 5) + 1,
        phone: '+1234567890',
        countApartments: Math.floor(Math.random() * 100) + 1,
        priceMax: Math.floor(Math.random() * 1000000) + 100000,
        priceMin: Math.floor(Math.random() * 100000) + 10000,
        logo: '/assets/img/logo.png',
        titlePicture: '/assets/img/стел жк 7.png',
        dueYear: '2024',
        dueQuart: Math.floor(Math.random() * 4) + 1,
      };
      this.rcomplexPopulars.push(r);
    }
  }
}
