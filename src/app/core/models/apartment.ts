export interface Apartment {
  id: bigint;
  numberOfRooms: string;
  address: string;
  date_release: string;
  company: string;
  price: number;
}

export interface ApartmentFull {
  id: bigint;
  photoMainPath: string;
  photoDefaultPath: string;
  apartmentNumber: number;
  apartmentInfo: string;
  entrance: number;
  numberOfFloorsPerEnt: number;
  areaTotal: number;
  areaKitchen: number;
  areaLiving: number;
  percent: number;
  phone: string;
  priceAfterFormat: string;
  priceSqmtAfterFormat: string;
  webHref: string;
  tags: string;
  countView: bigint;
  status: string;
  statusInfo: string;
  article: string;
  numberOfRooms: number;
  price: bigint;
  balcony: string;
  priceSqmt: bigint;
  floor: number;
  apartmentType: number;
  layoutType: number;
  roof: string;
  height_roof: string;
  company: string;
  viewFromWindows:number;
  rcomplexDto: {
    name: string;
    ceilingHeight: number;
    id:bigint;
    address: string;
    type_build: string;
    dueYear: string;
    dueQuart: number;
    parking: string;
    info:string;
    houseType:number;
  }
}

export interface ApartmentShortCard {
  id: bigint;
  photoMainPath: string;
  photoDefaultPath: string;
  apartmentNumber: number;
  apartmentInfo: string;
  entrance: number;
  numberOfFloorsPerEnt: number;
  areaTotal: number;
  areaKitchen: number;
  areaLiving: number;
  percent: number;
  phone: string;
  priceAfterFormat: string;
  priceSqmtAfterFormat: string;
  webHref: string;
  tags: string;
  countView: bigint;
  status: string;
  statusInfo: string;
  article: string;
  numberOfRooms: number;
  price: bigint;
  priceSqmt: bigint;
  floor: number;
  apartmentType: string;
  dueYear: string;
  dueQuart: number;
  houseType:number;
  address: string;
  company: string;
  companyId: number;
}


export interface ApartmentWEB extends Apartment {
  webid: string;
}


