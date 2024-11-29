import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApartmentShortCard, ApartmentWEB} from "../../../core/models/apartment";
import {RComplexFull, RComplexPopular, RComplexRandomInstance} from "../../../core/models/rcomplex";
import {DataService} from "../../../core/services/data.service";
import {data} from "jquery";

@Component({
  selector: 'app-r-complex',
  templateUrl: './r-complex.component.html',
  styleUrl: './r-complex.component.css'
})
export class RComplexComponent {
  public id!: string;
  public apartments: ApartmentShortCard[] = [];
  public rcomplex!: RComplexFull;
  public loading: boolean = true;

  constructor(private route: ActivatedRoute, private readonly dataservice: DataService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
    });


    // this.testFillData()

    if (this.id) {
      this.dataservice.getRComplex({
        method: "findByid",
        id: Number(this.id),
        limit: 0
      }).subscribe({
        next: (dataValue: any): void => {
          if (dataValue != null) {
            this.rcomplex = dataValue;

            console.error(this.rcomplex);

            if(!this.rcomplex.logo)
              this.rcomplex.logo = "/assets/img/logo.png"
            if(!this.rcomplex.map)
              this.rcomplex.map = ""

          }

          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      })

    }

  }

  private testFillData() {
    this.rcomplex =new RComplexRandomInstance();

    const randomCompanies = ['Строительная компания A', 'Строительная компания B', 'Строительная компания C', 'Company D', 'Company E'];


    for (let i = 0; i < 10; i++) {

      const a: ApartmentShortCard = {
        id: BigInt(1),
        photoDefaultPath:`/assets/img/image 2.png`,
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
