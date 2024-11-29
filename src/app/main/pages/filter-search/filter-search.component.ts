import {Component, HostListener} from '@angular/core';
import {ApartmentShortCard} from "../../../core/models/apartment";
import {DataService} from "../../../core/services/data.service";
import {ApartmentFilterSearch, FilterSearch} from "../../../core/models/search";
import {FilterService} from "../../../core/services/filter.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrl: './filter-search.component.css'
})


export class FilterSearchComponent {
  public toSearch!: ApartmentFilterSearch;
  public srok: string = "10.10.2024"
  public apartments: ApartmentShortCard[] = [];
  public filter!: FilterSearch;
  public countForBtn: string = ""
  public totalPages!: number;
  public totalElements!: number;
  public pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  public size: number = 10;
  public page: number = 0;
  formControl = new FormControl('');
  loading: boolean = false;
  isApartmen: boolean = true;

  constructor(private dataservice: DataService, private filterservice: FilterService) {

  }

  ngOnInit(): void {

    // this.toSearch = JSON.parse(sessionStorage.getItem("toFilterSearch")!);

    this.filter = this.filterservice.getFilterData()
    if (sessionStorage.getItem("toFilterSearch") == 'submit') {
      this.filterSearch()
      //this.testFillData()
    } else {
      window.scroll({
        top: 300,
        left: 0,
        behavior: "smooth",
      });

    }
    sessionStorage.setItem("toFilterSearch", "")
    this.filterservice.clearFilterData();

  }


  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler() {
    console.log("RELOAD")

  }

  public filterSearch(): void {

    this.loading = true;

    if (this.filter != null) {
      this.toSearch = {
        numberOfRooms: this.filterservice.numberOfRooms(this.filter),
        priceMin: this.filter.priceMin,
        priceMax: this.filter.priceMax,
        areaTotalMin: this.filter.areaTotalMin,
        areaTotalMax: this.filter.areaTotalMax
      }
    }

    this.dataservice.search(this.toSearch, this.size, this.page).subscribe({
      next: (data: any): void => {

        this.apartments = data?.body.content
        this.totalPages = data?.body.totalPages
        this.totalElements = data?.body.totalElements
        this.isApartmen = false;


        if (this.apartments != null && this.apartments.length > 0) {
          this.isApartmen = true
          window.scroll({
            top: 900,
            left: 0,
            behavior: "smooth",
          });
        } else {
          window.scroll({
            top: 250,
            left: 0,
            behavior: "smooth",
          });
        }

        this.loading = false;
      }
    })

  }

  clearSearch() {

    this.filter = this.filterservice.clearFilterData();

  }

  formatRoom(value: number) {
    let rooms = ""
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(value)) {
      rooms = value + "-ком. квартира, ";
    } else if (value == 0) {
      rooms = "Свободная планировка, ";
    } else if (value == 0.5) {
      rooms = "Студия, ";
    } else if (value !== Math.floor(value)) {
      rooms = value + "-евро, ";
    } else {
      rooms = "Многокомнатная квартира, ";

    }

    return rooms


  }


  formatPrice(num: string) {
    if (!/^\d+$/.test(num)) {
      return 0
    } else {
      //  if (num.length > 3) {
      //   num = this.formatPrice(num.substring(0, num.length - 3)) + " " + num.substring(num.length - 3, num.length)
      //  }
      num = num.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

      return num
    }
  }


  nameApartType(apartmentType: string) {

    if (apartmentType == '1') {
      return 'квартира'
    } else {
      return 'апартаменты'
    }

    return "";

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

      this.apartments.push(a);
    }

    this.loading = false;
  }

}
