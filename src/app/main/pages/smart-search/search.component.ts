import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApartmentShortCard } from '../../../core/models/apartment';
import { SmartParameters } from '../../../core/models/parametrs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { DataService } from '../../../core/services/data.service';
import { SmartSearch } from '../../../core/models/search';
import { Company } from '../../../core/models/company';
import { SmartParametersComponent } from '../../components/smart-parameters/smart-parameters.component';
import { MatDialog } from '@angular/material/dialog';

const HOUSE_TYPES = [
  'Кирпичный',
  'Монолитный',
  'Панельный',
  'Кирпично-монолитный',
  'Блочный',
  'Другой',
];

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit, AfterViewInit {
  public companies: Company[] = [];
  public apartments: ApartmentShortCard[] = [];
  public smartParameters!: SmartParameters;
  public currentState$!: Observable<SmartParameters>;
  public loading: boolean = true;
  public houseTypes: string[] = HOUSE_TYPES;
  public smart: boolean = true;
  public choosedItems: any[] = [];
  public limit = 25;
  public offset = 0;

  constructor(
    private dataservice: DataService,
    public route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    // Получаем состояние

    if (this.router.getCurrentNavigation()) {
      const navigation = this.router.getCurrentNavigation();
      this.smartParameters =
        navigation && navigation.extras && navigation.extras.state
          ? navigation.extras?.state['smartParam']
          : undefined;

      this.smartParameters.parametrs = [{ name: 'isSmart', check: false }];
    }
    this.companies.push(new Company(1, 'АО СЗ ФК "АКСИОМА"', '123-456-7890'));
    this.companies.push(
      new Company(2, 'ООО Предприятие «ИП К.И.Т.»', '987-654-3210')
    );
    this.companies.push(new Company(3, 'ООО "СТЭЛ инвест"', '555-555-5555'));
  }

  ngOnInit(): void {
    this.currentState$ = this.route.paramMap.pipe(
      map(() => window.history.state.smartParam)
    );

    if (this.router.getCurrentNavigation()) {
      const navigation = this.router.getCurrentNavigation();
      this.smartParameters =
        navigation && navigation.extras && navigation.extras.state
          ? navigation.extras?.state['smartParam']
          : undefined;
    }

    this.testFillData();

    this.searching();

    const input = document.getElementById('о6b6h') as HTMLInputElement;
    if (input) {
      input.addEventListener('input', (event) => {
        // Удаляем все символы, кроме цифр
        let value = input.value.replace(/\D/g, '');

        // Форматируем число с пробелами
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        // Обновляем значение input
        input.value = value;
        this.smartParameters.pricePreference = Number(
          value.replaceAll(' ', '')
        );
      });
    }
  }

  ngAfterViewInit(): void {
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"], input[type="range"], input[type="number"]'
    );

    checkboxes.forEach((input) => {
      input.addEventListener('change', () => {
        if (input.getAttribute('checked') == null) {
          input.setAttribute('checked', 'checked');
          this.choosedItems.push(input.id);
        } else {
          input.removeAttribute('checked');
          let indexToRemove = this.choosedItems.indexOf(input.id);
          if (indexToRemove !== -1) {
            this.choosedItems.splice(indexToRemove, 1);
          }
        }
      });
    });
  }

  showPhone(event: Event, phone: string) {
    event.stopPropagation();
    alert('тел: ' + phone);
  }

  public searching(): void {
    this.loading = true;

    if (this.smartParameters) {
      const toSearch: SmartSearch = {
        apartmentType: this.getApartmentType(),
        apartmentTypeWeight: SearchComponent.getWeight(
          this.smartParameters.apartmentTypeWeight
        ),

        numberOfRooms: this.getQuantityRooms(),
        numberOfRoomsWeight: SearchComponent.getWeight(
          this.smartParameters.numberOfRoomsWeight
        ),

        plan: this.getPlan(),
        planWeight: SearchComponent.getWeight(this.smartParameters.planWeight),

        price: this.getTriangle(
          this.smartParameters.priceMin,
          this.smartParameters.pricePreference,
          this.smartParameters.priceMax
        ),
        priceWeight: SearchComponent.getWeight(
          this.smartParameters.priceWeight
        ),

        floor: this.getTriangle(
          this.smartParameters.floorMin,
          this.smartParameters.floorPreference,
          this.smartParameters.floorMax
        ),
        floorWeight: SearchComponent.getWeight(
          this.smartParameters.floorWeight
        ),
        isLastFloor: this.smartParameters.isLastFloor,
        isNotFirstFloor: this.smartParameters.isNotFirstFloor,
        isNotLastFloor: this.smartParameters.isNotLastFloor,

        countFloor: this.getTriangle(
          this.smartParameters.countFloorMin,
          this.smartParameters.countFloorPreference,
          this.smartParameters.countFloorMax
        ),
        countFloorWeight: SearchComponent.getWeight(
          this.smartParameters.countFloorWeight
        ),

        areaTotal: this.getTriangle(
          this.smartParameters.areaTotalMin,
          this.smartParameters.areaTotalPreference,
          this.smartParameters.areaTotalMax
        ),
        areaKitchen: this.getTriangle(
          this.smartParameters.areaKitchenMin,
          this.smartParameters.areaKitchenPreference,
          this.smartParameters.areaKitchenMax
        ),
        areaLiving: this.getTriangle(
          this.smartParameters.areaLivingMin,
          this.smartParameters.areaLivingPreference,
          this.smartParameters.areaLivingMax
        ),
        areaWeight: SearchComponent.getWeight(this.smartParameters.areaWeight),

        viewFromWindows: this.getViews(),
        viewFromWindowsWeight: SearchComponent.getWeight(
          this.smartParameters.viewFromWindowsWeight
        ),

        balcony: this.getBalcony(),
        balconyWeight: SearchComponent.getWeight(
          this.smartParameters.balconyWeight
        ),

        bathroom: this.getBathroom(),
        bathroomWeight: SearchComponent.getWeight(
          this.smartParameters.bathroomWeight
        ),

        isElectricStove: this.smartParameters.isElectricStove,
        isGasStove: this.smartParameters.isGasStove,
        stoveWeight: SearchComponent.getWeight(
          this.smartParameters.stoveWeight
        ),

        decoration: this.getDecoration(),
        decorationWeight: SearchComponent.getWeight(
          this.smartParameters.decorationWeight
        ),

        numberOfApartments: this.getTriangle(
          this.smartParameters.numberOfApartmentsMin,
          this.smartParameters.numberOfApartmentsPreference,
          this.smartParameters.numberOfApartmentsMax
        ),
        numberOfApartmentsWeight: SearchComponent.getWeight(
          this.smartParameters.numberOfApartmentsWeight
        ),

        areaPrice: this.getTriangle(
          this.smartParameters.areaPriceMin,
          this.smartParameters.areaPricePreference,
          this.smartParameters.areaPriceMax
        ),
        areaPriceWeight: SearchComponent.getWeight(
          this.smartParameters.areaPriceWeight
        ),

        decorationWall: this.getDecorationWall(),
        decorationWallWeight: SearchComponent.getWeight(
          this.smartParameters.decorationWallWeight
        ),

        decorationCeiling: this.getDecorationCeiling(),
        decorationCeilingWeight: SearchComponent.getWeight(
          this.smartParameters.decorationCeilingWeight
        ),

        floorCovering: this.getFloorCovering(),
        floorCoveringWeight: SearchComponent.getWeight(
          this.smartParameters.floorCoveringWeight
        ),

        repairType: this.getRepairType(),
        repairTypeWeight: SearchComponent.getWeight(
          this.smartParameters.repairTypeWeight
        ),

        glazing: this.getGlazing(),
        glazingWeight: SearchComponent.getWeight(
          this.smartParameters.glazingWeight
        ),

        isWithoutDecBathroom: this.smartParameters.isWithoutDecBathroom,
        isWithDecBathroom: this.smartParameters.isWithDecBathroom,
        decorationBathroomWeight: SearchComponent.getWeight(
          this.smartParameters.decorationBathroomWeight
        ),

        radiators: this.getRadiators(),
        radiatorsWeight: SearchComponent.getWeight(
          this.smartParameters.radiatorsWeight
        ),

        houseType: this.getBuilds(),
        houseTypeWeight: SearchComponent.getWeight(
          this.smartParameters.buildWeight
        ),

        dClass: this.getClass(),
        dClassWeight: SearchComponent.getWeight(
          this.smartParameters.classWeight
        ),

        asesmic: this.getAsesmic(),
        asesmicWeight: SearchComponent.getWeight(
          this.smartParameters.asesmicWeight
        ),

        due: [
          this.smartParameters.dueYearMin,
          this.smartParameters.dueYearMax,
          this.smartParameters.isDone ? 1 : 0,
        ],
        dueWeight: SearchComponent.getWeight(this.smartParameters.dueWeight),

        ceilingHeight: this.getCeilingHeight(),
        ceilingHeightWeight: SearchComponent.getWeight(
          this.smartParameters.ceilingHeightWeight
        ),

        numberElevators: this.getNumberElevators(),
        numberElevatorsWeight: SearchComponent.getWeight(
          this.smartParameters.numberElevatorsWeight
        ),

        smartHome: this.getSwitch([
          this.smartParameters.isSmart,
          this.smartParameters.isNotSmart,
        ]),
        smartHomeWeight: SearchComponent.getWeight(
          this.smartParameters.smartHomeWeight
        ),

        elevatorType: this.getSet([
          this.smartParameters.isPassenger,
          this.smartParameters.isCargo,
          this.smartParameters.isCargo && this.smartParameters.isPassenger,
        ]),
        elevatorTypeWeight: SearchComponent.getWeight(
          this.smartParameters.elevatorTypeWeight
        ),

        selfBoiler: this.getSwitch([
          this.smartParameters.isSelfBoiler,
          this.smartParameters.isNoSelfBoiler,
        ]),
        selfBoilerWeight: SearchComponent.getWeight(
          this.smartParameters.selfBoilerWeight
        ),

        nearby: this.getNearby(),
        nearbyWeight: SearchComponent.getWeight(
          this.smartParameters.nearbyWeight
        ),

        parking: this.getParking(),
        parkingWeight: SearchComponent.getWeight(
          this.smartParameters.parkingWeight
        ),

        closedYard: this.getSwitch([
          this.smartParameters.isClosedYard,
          this.smartParameters.isNoClosedYard,
        ]),
        closedYardWeight: SearchComponent.getWeight(
          this.smartParameters.closedYardWeight
        ),

        furniture: this.getSet([
          this.smartParameters.isNoFurniture,
          this.smartParameters.isFurnitureKitch,
          this.smartParameters.isFurniture,
        ]),
        furnitureWeight: SearchComponent.getWeight(
          this.smartParameters.furnitureWeight
        ),

        saleType: this.getSet([
          this.smartParameters.isDDU,
          this.smartParameters.isGSK,
          this.smartParameters.isPereustpka,
          this.smartParameters.isDKP,
        ]),
        warranty: this.getSwitch([
          this.smartParameters.isWarranty,
          this.smartParameters.isNoWarranty,
        ]),
        onlineBooking: this.getSwitch([
          this.smartParameters.isWithOnlineBook,
          this.smartParameters.isWithOutOnlineBook,
        ]),
        electronReg: this.getSwitch([
          this.smartParameters.isElectronReg,
          this.smartParameters.isNoElectronReg,
        ]),
        stoke: this.getSwitch([
          this.smartParameters.isStoke,
          this.smartParameters.isNoStoke,
        ]),
        dealWeight: SearchComponent.getWeight(this.smartParameters.dealWeight),
        company: this.smartParameters.company,
        companyExcp: this.smartParameters.companyExcp,
      };
    }
  }

  private static getWeight(weight: number): number {
    if (weight == null || weight == 0) return 1 / 10;
    return weight / 10;
  }

  private getTriangle(a: number, m: number | null, b: number): number[] | null {
    if (a == null || m == null || b == null) return null;
    return [Number(a), Number(m), Number(b)];
  }

  private getQuantityRooms(): number[] | null {
    let quantityRooms: number[] = [];
    if (this.smartParameters.isAtelier) quantityRooms.push(0.5);
    if (this.smartParameters.isOne) quantityRooms.push(1);
    if (this.smartParameters.isTwo) quantityRooms.push(2);
    if (this.smartParameters.isThree) quantityRooms.push(3);
    if (this.smartParameters.isFour) quantityRooms.push(4);
    if (this.smartParameters.isFreeLayout) quantityRooms.push(0);
    if (this.smartParameters.isFivePlus) quantityRooms.push(5);
    if (this.smartParameters.isOneEuro) quantityRooms.push(1.5);
    if (this.smartParameters.isTwoEuro) quantityRooms.push(2.5);
    if (this.smartParameters.isThreeEuro) quantityRooms.push(3.5);

    return quantityRooms.length > 0 ? quantityRooms : null;
  }

  private getApartmentType(): number[] | null {
    let apartmentType: number[] = [];
    if (this.smartParameters.isFlat) apartmentType.push(1); // Квартира
    if (this.smartParameters.isApartments) apartmentType.push(2); // Апартаменты

    return apartmentType.length > 0 ? apartmentType : null;
  }

  private getPlan(): number[] | null {
    let planType: number[] = [];
    if (this.smartParameters.isBlandPlan) planType.push(1); // смежная
    if (this.smartParameters.isIsolatePlan) planType.push(2); // изолированная

    return planType.length > 0 ? planType : null;
  }

  private getViews(): number[] | null {
    let characteristics: number[] = [];
    if (this.smartParameters.isViewStreet) characteristics.push(2);
    if (this.smartParameters.isViewYard) characteristics.push(1);
    if (this.smartParameters.isViewBothSide) characteristics.push(3);

    return characteristics.length > 0 ? characteristics : null;
  }

  private getBalcony(): number[] | null {
    let characteristics: number[] = [];
    if (this.smartParameters.isBalcony) characteristics.push(1);
    if (this.smartParameters.isLoggia) characteristics.push(2);
    if (this.smartParameters.isInsulatedBalcony) characteristics.push(3);

    return characteristics.length > 0 ? characteristics : null;
  }

  private getBathroom(): number[] | null {
    let characteristics: number[] = [];
    if (this.smartParameters.isCombined) characteristics.push(1);
    if (this.smartParameters.isSeparate) characteristics.push(2);
    if (this.smartParameters.isTwoBath) characteristics.push(3);

    return characteristics.length > 0 ? characteristics : null;
  }

  private getDecoration(): number[] | null {
    let characteristics: number[] = [];
    if (this.smartParameters.isPreFinishing) characteristics.push(1);
    if (this.smartParameters.isFinishing) characteristics.push(2);
    if (this.smartParameters.isEconomyClass) characteristics.push(3);
    if (this.smartParameters.isComfortClass) characteristics.push(4);
    if (this.smartParameters.isBusinessClass) characteristics.push(5);
    if (this.smartParameters.isWithoutFinishing) characteristics.push(6);

    return characteristics.length > 0 ? characteristics : null;
  }

  private getDecorationWall(): number[] | null {
    let characteristics: number[] = [];
    if (this.smartParameters.isWallpaper) characteristics.push(1);
    if (this.smartParameters.isPaint) characteristics.push(2);
    if (this.smartParameters.isPanelWall) characteristics.push(3);
    if (this.smartParameters.isLincrusta) characteristics.push(4);
    if (this.smartParameters.isPlaster) characteristics.push(5);
    if (this.smartParameters.isBrickWall) characteristics.push(6);
    if (this.smartParameters.isWithoutWall) characteristics.push(7);

    return characteristics.length > 0 ? characteristics : null;
  }

  private getDecorationCeiling(): number[] | null {
    let characteristics: number[] = [];
    if (this.smartParameters.isWhiteCeiling) characteristics.push(1);
    if (this.smartParameters.isColorCeiling) characteristics.push(2);
    if (this.smartParameters.isTilesCeiling) characteristics.push(3);
    if (this.smartParameters.isFalseCeiling) characteristics.push(4);
    if (this.smartParameters.isStretchCeiling) characteristics.push(5);
    if (this.smartParameters.isWithoutCeiling) characteristics.push(6);

    return characteristics.length > 0 ? characteristics : null;
  }

  private getFloorCovering(): number[] | null {
    let characteristics: number[] = [];
    if (this.smartParameters.isLinoleum) characteristics.push(1);
    if (this.smartParameters.isLaminate) characteristics.push(2);
    if (this.smartParameters.isParquet) characteristics.push(3);
    if (this.smartParameters.isStoneware) characteristics.push(4);
    if (this.smartParameters.isQuartzvinyl) characteristics.push(5);
    if (this.smartParameters.isWithoutFloor) characteristics.push(6);

    return characteristics.length > 0 ? characteristics : null;
  }

  private getRepairType(): number[] | null {
    let characteristics: number[] = [];
    if (this.smartParameters.isCosmeticRep) characteristics.push(1);
    if (this.smartParameters.isEuroRep) characteristics.push(2);
    if (this.smartParameters.isDisignRep) characteristics.push(3);
    if (this.smartParameters.isWithoutRep) characteristics.push(4);

    return characteristics.length > 0 ? characteristics : null;
  }

  private getGlazing(): number[] | null {
    let characteristics: number[] = [];
    if (this.smartParameters.isPVH) characteristics.push(1);
    if (this.smartParameters.isAluminum) characteristics.push(2);
    if (this.smartParameters.isVitrazh) characteristics.push(3);
    if (this.smartParameters.isWithoutGlazing) characteristics.push(4);

    return characteristics.length > 0 ? characteristics : null;
  }

  private getRadiators(): number[] | null {
    let characteristics: number[] = [];
    if (this.smartParameters.isBimetalRadtr) characteristics.push(1);
    if (this.smartParameters.isSteelRadtr) characteristics.push(2);
    if (this.smartParameters.isAluminumRadtr) characteristics.push(3);

    return characteristics.length > 0 ? characteristics : null;
  }

  private getBuilds(): number[] | null {
    let characteristics: number[] = [];
    if (this.smartParameters.isPanelBuild) characteristics.push(1);
    if (this.smartParameters.isBrickBuild) characteristics.push(2);
    if (this.smartParameters.isMonolithicBuild) characteristics.push(3);
    if (this.smartParameters.isMnlBrckBuild) characteristics.push(4);
    if (this.smartParameters.isBlockBuild) characteristics.push(5);
    if (this.smartParameters.isAnotherBuild) characteristics.push(6);

    return characteristics.length > 0 ? characteristics : null;
  }

  private getClass(): string[] | null {
    let d_class: string[] = [];
    if (this.smartParameters.isClassA) d_class.push('A');
    if (this.smartParameters.isClassB) d_class.push('B');
    if (this.smartParameters.isClassC) d_class.push('C');
    if (this.smartParameters.isClassD) d_class.push('D');
    if (this.smartParameters.isClassE) d_class.push('E');

    return d_class.length > 0 ? d_class : null;
  }

  private getCeilingHeight(): number[] | null {
    let ceilingHeight: number[] = [];
    if (this.smartParameters.isCeilHeightTo2_7) ceilingHeight.push(2.69);
    if (this.smartParameters.isCeilHeightFrom2_7) ceilingHeight.push(2.7);
    if (this.smartParameters.isCeilHeightFrom3) ceilingHeight.push(3);
    if (this.smartParameters.isCeilHeightTFrom3_5) ceilingHeight.push(3.5);

    return ceilingHeight.length > 0 ? ceilingHeight : null;
  }

  private getAsesmic(): number[] | null {
    let characteristics: number[] = [];
    if (this.smartParameters.isAsesmic5) characteristics.push(5);
    if (this.smartParameters.isAsesmic6) characteristics.push(6);
    if (this.smartParameters.isAsesmic7) characteristics.push(7);

    return characteristics.length > 0 ? characteristics : null;
  }

  private getSet(array: boolean[]): number[] | null {
    const characteristics: number[] = [];

    array.forEach((value, index) => {
      if (value) {
        characteristics.push(index + 1);
      }
    });

    return characteristics.length > 0 ? characteristics : null;
  }

  private getSwitch(array: boolean[]): boolean[] | null {
    const characteristics = array.reduce<boolean[]>((acc, value, index) => {
      if (index === 0 && value) acc.push(true);
      if (index === 1 && value) acc.push(false);
      return acc;
    }, []);

    return characteristics.length > 0 ? characteristics : null;
  }

  private getNumberElevators(): boolean[] | null {
    if (
      !this.smartParameters.isElevator1 &&
      !this.smartParameters.isElevator2 &&
      !this.smartParameters.isElevator3
    )
      return null;

    return [
      this.smartParameters.isElevator1,
      this.smartParameters.isElevator2,
      this.smartParameters.isElevator3,
    ];
  }

  private getNearby(): number[] | null {
    const characteristics: number[] = [];
    const array: boolean[] = [
      this.smartParameters.isNearbyShop,
      this.smartParameters.isNearbyFitness,
      this.smartParameters.isNearbyPark,
      this.smartParameters.isNearbySchool,
      this.smartParameters.isNearbyKindergarten,
      this.smartParameters.isNearbyPolyclinic,
      this.smartParameters.isNearbyBusStation,
      this.smartParameters.isNearbyCarService,
    ];

    array.forEach((value, index) => {
      if (value) {
        characteristics.push(index + 1);
      }
    });

    return characteristics.length > 0 ? characteristics : null;
  }

  private getParking(): number[] | null {
    const characteristics: number[] = [];
    const array: boolean[] = [
      this.smartParameters.isUnderground,
      this.smartParameters.isSurface,
      this.smartParameters.isOpenParking,
      this.smartParameters.isClosedParking,
    ];

    array.forEach((value, index) => {
      if (value) {
        characteristics.push(index + 1);
      }
    });

    return characteristics.length > 0 ? characteristics : null;
  }

  public getCompany(id: number): string | undefined {
    let lst: string = '';
    this.companies.forEach((company) => {
      if (company.id == id) {
        lst += `${company.name}`;
      }
    });

    return lst;
  }

  getHouseTypeName(houseType: number): string {
    if (this.houseTypes && this.houseTypes.length >= houseType) {
      return this.houseTypes[houseType - 1];
    }
    return '';
  }

  getNumberOfRoomsString(numberOfRooms: number): string {
    if (numberOfRooms == 0) return 'Свободная планировка';
    if (numberOfRooms == 0.5) return 'Студия';
    if (numberOfRooms == 1) return '1 комната';
    if (numberOfRooms == 1.5) return 'Еврооднушка';
    if (numberOfRooms == 2 || numberOfRooms == 3 || numberOfRooms == 4)
      return numberOfRooms + ' комнаты';

    if (numberOfRooms == 2.5) return 'Евродвушка';
    if (numberOfRooms == 3.5) return 'Евротрешка';

    return String(numberOfRooms + ' комнат');
  }

  loadMore(): void {
    if (this.choosedItems.length > 0) {
      this.reload();
    }
    this.searching();
  }

  openDialog() {
    const dialogRef = this.dialog.open(SmartParametersComponent, {
      height: '100%',
      width: '95%',
      data: this.smartParameters,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.smartParameters = result;
      }
      this.reload();
    });
  }

  reload() {
    this.apartments = [];
    this.choosedItems = [];
    this.limit = 10;
    this.offset = 0;
    this.searching();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  clearFilter() {
    this.smartParameters = new SmartParameters();
    this.choosedItems.push('any_item');
  }

  percentRound(percent: number) {
    if (percent != 0) {
      return Math.round(percent) + '%';
    }
    return '';
  }

  private testFillData() {
    const randomCompanies = [
      'Строительная компания A',
      'Строительная компания B',
      'Строительная компания C',
      'Company D',
      'Company E',
    ];

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
        company:
          randomCompanies[Math.floor(Math.random() * randomCompanies.length)],
        companyId: Math.floor(Math.random() * 100),
      };

      this.apartments.push(a);
    }
  }

  onRangeChange($event: number) {
    const input = document.getElementById('о6b6h') as HTMLInputElement;
    input.value = String(this.smartParameters.pricePreference).replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ' '
    );
  }
}
