export interface FilterSearch {

  priceMin: string | '';
  priceMax: string | '';
  areaTotalMin: string | '';
  areaTotalMax: string | '';

  isAtelier: boolean | false;
  isOne: boolean | false;
  isTwo: boolean | false;
  isThree: boolean | false;
  isFour: boolean | false;
  isFivePlus: boolean | false;
}

export interface ApartmentFilterSearch {
  priceMin: string;
  priceMax: string;
  areaTotalMin: string;
  areaTotalMax: string;
  numberOfRooms: string[] | null;
}

export interface SmartSearch {
  numberOfRooms: number[] | null;
  numberOfRoomsWeight: number;

  plan: number[] | null;
  planWeight: number;

  price: number[] | null;
  priceWeight: number;

  numberOfApartments: number[] | null;
  numberOfApartmentsWeight: number;

  areaPrice: number[] | null;
  areaPriceWeight: number;

  areaTotal: number[] | null;
  areaKitchen: number[] | null;
  areaLiving: number[] | null;
  areaWeight: number;

  floor: number[] | null;
  floorWeight: number;
  isLastFloor: boolean;
  isNotFirstFloor: boolean;
  isNotLastFloor: boolean;

  isElectricStove: boolean;
  isGasStove: boolean;
  stoveWeight: number;

  countFloor: number[] | null;
  countFloorWeight: number;

  apartmentType: number[] | null;
  apartmentTypeWeight: number;

  viewFromWindows: number[] | null;
  viewFromWindowsWeight: number;

  balcony: number[] | null;
  balconyWeight: number;

  bathroom: number[] | null;
  bathroomWeight: number;

  decoration: number[] | null;
  decorationWeight: number;
  decorationWall: number[] | null;
  decorationWallWeight: number;
  decorationCeiling: number[] | null;
  decorationCeilingWeight: number;

  isWithoutDecBathroom: boolean;
  isWithDecBathroom: boolean;
  decorationBathroomWeight: number;

  floorCovering: number[] | null;
  floorCoveringWeight: number

  repairType: number[] | null;
  repairTypeWeight: number;

  glazing: number[] | null;
  glazingWeight: number;

  radiators: number[] | null;
  radiatorsWeight: number;

  houseType: number[] | null;
  houseTypeWeight: number;

  dClass: string[] | null;
  dClassWeight: number;

  ceilingHeight: number[] | null;
  ceilingHeightWeight: number;

  asesmic: number[] | null;
  asesmicWeight: number;

  due: number[] | null;
  dueWeight: number;

  numberElevators: boolean[] | null;
  numberElevatorsWeight: number;

  smartHome: boolean[] | null;
  smartHomeWeight: number;

  elevatorType: number[] | null;
  elevatorTypeWeight: number;

  selfBoilerWeight: number;
  selfBoiler: boolean[] | null;

  nearby: number[] | null;
  nearbyWeight: number;

  parking: number[] | null;
  parkingWeight: number;

  closedYard: boolean[] | null;
  closedYardWeight: number;

  furniture: number[] | null;
  furnitureWeight: number;

  saleType: number[] | null;
  warranty: boolean[] | null;
  onlineBooking: boolean[] | null;
  electronReg: boolean[] | null;
  stoke: boolean[] | null;
  dealWeight: number;

  company: number | null;
  companyExcp: number | null;
}
