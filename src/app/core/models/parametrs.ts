import {SmartParametersComponent} from "../../main/components/smart-parameters/smart-parameters.component";
import {inject, Injectable} from "@angular/core";

export interface Parameters {
  isAtelier: boolean
  isOne: boolean
  isTwo: boolean
  isThree: boolean
  isFour: boolean
  isOneEuro: boolean
  isTwoEuro: boolean
  isThreeEuro: boolean
  isFreeLayout: boolean
  isFivePlus: boolean
  isApartments: boolean
  isFlat: boolean
  isIsolatePlan: boolean
  isBlandPlan: boolean
  isNotFirstFloor: boolean
  isNotLastFloor: boolean;
  isLastFloor: boolean;
  countFloorMin: number;
  countFloorMax: number;
  areaTotalMin: number;
  areaTotalMax: any;
  areaLivingMin: any;
  areaLivingMax: any;
  areaKitchenMax: any;
  areaKitchenMin: any;

  priceMin: number;
  priceMax: number;
  areaPriceMin: number;
  areaPriceMax: number;
  isViewYard: boolean;
  isViewStreet: boolean;
  isViewBothSide: boolean;
  isBalcony: boolean;
  isLoggia: boolean;
  isGasStove: boolean;
  isElectricStove: boolean;
  isInsulatedBalcony: boolean;
  isCombined: boolean;
  isSeparate: boolean;
  isTwoBath: boolean;
  isPreFinishing: boolean;
  isFinishing: boolean;
  isEconomyClass: boolean;
  isComfortClass: boolean;
  isBusinessClass: boolean;
  isWithoutFinishing: boolean;
  isWallpaper: boolean;
  isPaint: boolean;
  isPanelWall: boolean;
  isLincrusta: boolean;
  isPlaster: boolean;
  isBrickWall: boolean;
  isWithoutWall: boolean;
  isWhiteCeiling: boolean;
  isColorCeiling: boolean;
  isTilesCeiling: boolean;
  isFalseCeiling: boolean;
  isStretchCeiling: boolean;
  isWithoutCeiling: boolean;
  isStoneware: boolean;
  isLinoleum: boolean;
  isLaminate: boolean;
  isParquet: boolean;
  isQuartzvinyl: boolean;
  isWithoutFloor: boolean;
  isCosmeticRep: boolean;
  isEuroRep: boolean;
  isDisignRep: boolean;
  isWithoutRep: boolean;
  isPVH: boolean;
  isVitrazh: boolean;
  isWithoutGlazing: boolean;
  isAluminum: boolean;
  isWithoutDecBathroom: boolean;
  isWithDecBathroom: boolean;
  isBimetalRadtr: boolean;
  isSteelRadtr: boolean;
  isAluminumRadtr: boolean;
  isPanelBuild: boolean;
  isBrickBuild: boolean;
  isMonolithicBuild: boolean;
  isMnlBrckBuild: boolean;
  isBlockBuild: boolean;
  isAnotherBuild: boolean;
  isClassA: boolean;
  isClassB: boolean;
  isClassC: boolean;
  isClassD: boolean;
  isClassE: boolean;
  isAsesmic5: boolean
  isAsesmic6: boolean;
  isAsesmic7: boolean;
  dueYearMin: number;
  dueYearMax: number;
  isDone: boolean;
  isCeilHeightFrom2_7: boolean;
  isCeilHeightTo2_7: boolean;
  isCeilHeightFrom3: boolean;
  isCeilHeightTFrom3_5: boolean;
  isSmart: boolean;
  isNotSmart: boolean;
  numberOfApartmentsMin: number;
  numberOfApartmentsMax: number;
  isPassenger: boolean;
  isCargo: boolean;
  isAllElevatorsType: boolean;
  isSelfBoiler: boolean;
  isNoSelfBoiler: boolean;
  isNearbyShop: boolean;
  isNearbyFitness: boolean;
  isNearbyPark: boolean;
  isNearbySchool: boolean;
  isNearbyKindergarten: boolean;
  isNearbyPolyclinic: boolean;
  isNearbyBusStation: boolean;
  isNearbyCarService: boolean;
  isUnderground: boolean;
  isSurface: boolean;
  isOpenParking: boolean;
  isClosedParking: boolean;
  isNoFurniture: boolean;
  isFurniture: boolean;
  isFurnitureKitch: boolean;

  isWithOnlineBook: boolean;
  isWithOutOnlineBook: boolean;
  isElectronReg: boolean;
  isNoElectronReg: boolean;

  isStoke: boolean;
  isNoStoke: boolean;

}

export interface RoomsFilter {
  atelier: boolean,
  room_1: boolean,
  room_2: boolean,
  room_3: boolean,
  room_4: boolean,
  room_plus: boolean,
}

export interface implSmartParametrs extends Parameters {
  planWeight: number;
  apartmentTypeWeight: number;
  floorWeight: number;
  floorPreference: number | null;
  countFloorWeight: number;
  countFloorPreference: number | null;
  areaWeight: number;
  areaTotalPreference: number | null;
  priceWeight: number;
  pricePreference:  number | null;
  areaPriceWeight:  number;
  numberOfRoomsWeight: number;
  viewFromWindowsWeight: number;
  balconyWeight: number;
  bathroomWeight: number;
  stoveWeight: number;
  decorationWeight: number;
  decorationWallWeight: number;
  decorationCeilingWeight: number;
  floorCoveringWeight: number;
  repairTypeWeight: number;
  glazingWeight: number;
  decorationBathroomWeight: number;
  radiatorsWeight: number;
  buildWeight: number;
  classWeight: number;
  asesmicWeight: number;
  dueWeight: number;
  ceilingHeightWeight: number;
  numberElevatorsWeight: number;
  isElevator1: boolean;
  isElevator2: boolean;
  isElevator3: boolean;
  smartHomeWeight: number;
  numberOfApartmentsWeight: number;
  elevatorTypeWeight: number;
  selfBoilerWeight: number;
  nearbyWeight: number;
  parkingWeight: number;
  furnitureWeight: number;
  areaKitchenPreference:  number | null;
  areaLivingPreference:  number | null;
  areaPricePreference:  number | null;

}
@Injectable({providedIn: 'root'})
export class IncludParameters {

mainParam!:boolean;
  isAllElevatorsType!: boolean;
  isAluminum!: boolean;
  isAluminumRadtr!: boolean;
  isAnotherBuild!: boolean;
  isApartments!: boolean;
  isAsesmic5!: boolean;
  isAsesmic6!: boolean;
  isAsesmic7!: boolean;
  isAtelier!: boolean;
  isBalcony!: boolean;
  isBimetalRadtr!: boolean;
  isBlandPlan!: boolean;
  isBlockBuild!: boolean;
  isBrickBuild!: boolean;
  isBrickWall!: boolean;
  isBusinessClass!: boolean;
  isCargo!: boolean;
  isCeilHeightFrom2_7!: boolean;
  isCeilHeightFrom3!: boolean;
  isCeilHeightTFrom3_5!: boolean;
  isCeilHeightTo2_7!: boolean;
  isFinishing!: boolean;
  isFivePlus!: boolean;
  isFlat!: boolean;
  isFour!: boolean;
  isFreeLayout!: boolean;
  isFurniture!: boolean;
  isFurnitureKitch!: boolean;
  isGasStove!: boolean;
  isInsulatedBalcony!: boolean;
  isIsolatePlan!: boolean;
  isLaminate!: boolean;
  isLastFloor!: boolean;
  isLincrusta!: boolean;
  isLinoleum!: boolean;
  isLoggia!: boolean;
  isMnlBrckBuild!: boolean;
  isMonolithicBuild!: boolean;
  isNearbyBusStation!: boolean;
  isNearbyCarService!: boolean;
  isNearbyFitness!: boolean;
  isNearbyKindergarten!: boolean;
  isNearbyPark!: boolean;
  isNearbyPolyclinic!: boolean;
  isNearbySchool!: boolean;
  isNearbyShop!: boolean;
  isNoElectronReg!: boolean;
  isNoFurniture!: boolean;
  isNoSelfBoiler!: boolean;

}

@Injectable({providedIn: 'root'})
export class SmartParameters implements implSmartParametrs {
  parametrs: any = [];

  [key: string]: any;

  apartmentTypeWeight: number = 2;
  isApartments: boolean = false;
  isFlat: boolean = false;
  isBlandPlan: boolean = false;
  isIsolatePlan: boolean = false;
  planWeight: number = 0;
  floorWeight: number = 0;
  floorMin: number = 1;
  floorMax: number = 50;
  isNotFirstFloor: boolean = false;
  isNotLastFloor: boolean = false;
  isLastFloor: boolean = false;
  countFloorWeight: number = 0;
  countFloorMin: number = 1;
  countFloorMax: number = 50;
  areaWeight: number = 0;
  areaTotalMin: number = 10;
  areaTotalMax: number = 300;
  areaLivingMin: number = 10;
  areaLivingMax: number = 300;
  areaKitchenMin: number = 10;
  areaKitchenMax: number = 100;
  priceWeight!: number;
  priceMin: number = 100000;
  priceMax: number = 100000000;
  areaPriceWeight: number = 0;
  areaPriceMin: number = 10000;
  areaPriceMax: number = 1000000;
  rooms!: RoomsFilter;
  numberOfRoomsWeight: number = 0;
  public isAtelier: boolean = false;
  public isOne: boolean = false;
  public isTwo: boolean = false;
  public isThree: boolean = false;
  public isFour: boolean = false;
  public isOneEuro: boolean = false;
  public isTwoEuro: boolean = false;
  public isThreeEuro: boolean = false;
  public isFreeLayout: boolean = false;
  public isFivePlus: boolean = false;
  viewFromWindowsWeight: number = 0;
  isViewYard: boolean = false;
  isViewStreet: boolean = false;
  // isViewSunnySide: boolean = false;
  isViewBothSide: boolean = false;
  // isViewWestSide: boolean = false;
  // isViewNorthSide: boolean = false;
  // isSouthBothSide: boolean = false;
  // isViewEastSide: boolean = false;
  balconyWeight: number = 0;
  isBalcony: boolean = false;
  isLoggia: boolean = false;
  isInsulatedBalcony: boolean = false;
  bathroomWeight: number = 0;
  isCombined: boolean = false;
  isSeparate: boolean = false;
  isTwoBath: boolean = false;
  stoveWeight: number = 0;
  isGasStove: boolean = false;
  isElectricStove: boolean = false;
  decorationWeight: number = 0;
  isPreFinishing: boolean = false;
  isFinishing: boolean = false;
  isEconomyClass: boolean = false;
  isComfortClass: boolean = false;
  isBusinessClass: boolean = false;
  isWithoutFinishing: boolean = false;
  decorationWallWeight: number = 0;
  isWallpaper: boolean = false;
  isPaint: boolean = false;
  isPanelWall: boolean = false;
  isLincrusta: boolean = false;
  isPlaster: boolean = false;
  isBrickWall: boolean = false;
  isWithoutWall: boolean = false;
  decorationCeilingWeight: number = 0;
  isWhiteCeiling: boolean = false;
  isColorCeiling: boolean = false;
  isTilesCeiling: boolean = false;
  isFalseCeiling: boolean = false;
  isStretchCeiling: boolean = false;
  isWithoutCeiling: boolean = false;
  floorCoveringWeight: number = 0;
  isLinoleum: boolean = false;
  isLaminate: boolean = false;
  isParquet: boolean = false;
  isQuartzvinyl: boolean = false;
  isWithoutFloor: boolean = false;
  isStoneware: boolean = false;
  repairTypeWeight: number = 0;
  isCosmeticRep: boolean = false;
  isEuroRep: boolean = false;
  isDisignRep: boolean = false;
  isWithoutRep: boolean = false;
  glazingWeight: number = 0;
  isPVH: boolean = false;
  isVitrazh: boolean = false;
  isWithoutGlazing: boolean = false;
  isAluminum: boolean = false;
  decorationBathroomWeight: number = 0;
  isWithoutDecBathroom: boolean = false;
  isWithDecBathroom: boolean = false;
  radiatorsWeight: number = 0;
  isBimetalRadtr: boolean = false;
  isSteelRadtr: boolean = false;
  isAluminumRadtr: boolean = false;
  buildWeight: number = 0;
  isPanelBuild: boolean = false;
  isBrickBuild: boolean = false;
  isMonolithicBuild: boolean = false;
  isMnlBrckBuild: boolean = false;
  isBlockBuild: boolean = false;
  isAnotherBuild: boolean = false;
  classWeight: number = 0;
  isClassA: boolean = false;
  isClassB: boolean = false;
  isClassC: boolean = false;
  isClassD: boolean = false;
  isClassE: boolean = false;
  asesmicWeight: number = 0;
  isAsesmic5: boolean = false;
  isAsesmic6: boolean = false;
  isAsesmic7: boolean = false;
  dueWeight: number = 0;
  dueYearMin: number = 2024;
  dueYearMax: number = 2030;
  isDone: boolean = false;
  ceilingHeightWeight: number = 0;
  isCeilHeightFrom2_7: boolean = false;
  isCeilHeightTo2_7: boolean = false;
  isCeilHeightFrom3: boolean = false;
  isCeilHeightTFrom3_5: boolean = false;
  numberElevatorsWeight: number = 0;
  isElevator1: boolean = false;
  isElevator2: boolean = false;
  isElevator3: boolean = false;
  public smartHomeWeight: number = 0;
  public isSmart: boolean = false;
  public isNotSmart: boolean = false;
  numberOfApartmentsWeight: number = 0;
  numberOfApartmentsMin: number = 1;
  numberOfApartmentsMax: number = 30;
  isPassenger: boolean = false;
  isCargo: boolean = false;
  isAllElevatorsType: boolean = false;
  elevatorTypeWeight: number = 0;
  selfBoilerWeight: number = 0;
  isSelfBoiler: boolean = false;
  isNoSelfBoiler: boolean = false;
  nearbyWeight: number = 0;
  isNearbyShop: boolean = false;
  isNearbyFitness: boolean = false;
  isNearbyPark: boolean = false;
  isNearbySchool: boolean = false;
  isNearbyKindergarten: boolean = false;
  isNearbyPolyclinic: boolean = false;
  isNearbyBusStation: boolean = false;
  isNearbyCarService: boolean = false;

  isDDU: boolean = false;
  isGSK: boolean = false;
  isPereustpka: boolean = false;
  isDKP: boolean = false;

  isWarranty: boolean = false;
  isNoWarranty: boolean = false;

  parkingWeight: number = 0;
  isUnderground: boolean = false;
  isSurface: boolean = false;
  isOpenParking: boolean = false;
  isClosedParking: boolean = false;
  closedYardWeight: number = 0;
  isClosedYard: boolean = false;
  isNoClosedYard: boolean = false;

  furnitureWeight: number = 0;
  isNoFurniture: boolean = false;
  isFurniture: boolean = false;
  isFurnitureKitch: boolean = false;

  company: number = 0;
  companyExcp: number =0;

  areaTotalPreference: number | null = null;
  countFloorPreference: number | null = null;
  floorPreference: number | null = null;
  pricePreference: number | null = null;
  areaKitchenPreference: number | null = null;
  areaLivingPreference: number | null = null;
  areaPricePreference: number | null = null;
  numberOfApartmentsPreference: number | null = null;

  isWithOnlineBook: boolean = false;
  isWithOutOnlineBook: boolean = false;
  isElectronReg: boolean = false;
  isNoElectronReg: boolean = false;

  isStoke: boolean = false;
  isNoStoke: boolean = false;

  dealWeight: number = 0;

  getTrueProperties(): string[] {
    return Object.keys(this).filter(key => this[key as keyof SmartParameters] === true);
  }

}
