export interface Apartment {
  id: bigint;
  numberOfRooms: string;
  address: string;
  date_release: string;
  company: string;
  price: number;
}

export interface ApartmentFull {
  id?: bigint | null;
  photoMainPath?: string | null;
  photoDefaultPath?: string | null;
  apartmentNumber?: number | null;
  apartmentInfo?: string | null;
  entrance?: number | null;
  layoutType?: number | null;
  numberOfFloorsPerEnt?: number | null;
  areaTotal?: number | null;
  areaKitchen?: number | null;
  areaLiving?: number | null;
  percent?: number | null;
  phone?: string | null;
  priceAfterFormat?: string | null;
  priceSqmtAfterFormat?: string | null;
  webHref?: string | null;
  tags?: string | null;
  countView?: bigint | null;
  status?: string | null;
  statusInfo?: string | null;
  article?: string | null;
  numberOfRooms?: number | null;
  price?: bigint | null;
  balcony?: string | null;
  bathroom?: number | null;
  decoration?: number | null;
  decorationWall?: number | null;
  decorationCeiling?: number | null;
  floorCovering?: number | null;
  repairType?: number | null;
  glazing?: number | null;
  saleType?:number | null;
  isOnlineBooking?: boolean | null;
  isElectronReg?: boolean | null;
  isStock?: boolean | null;
  furniture?: number | null;
  isDecorationBathroom?: boolean | null;
  priceSqmt?: bigint | null;
  floor?: number | null;
  viewFromWindows?: number | null;
  apartmentType?: number | null;
  roof?: string | null;
  height_roof?: string | null;
  company?: string | null;
  rcomplexId?:number | null;
  rcomplexDto: {
    name?: string | null;
    ceilingHeight?: number | null;
    id?: number | null;
    address?: string | null;
    type_build?: string | null;
    dueYear?: string | null;
    dueQuart?: number | null;
    parking?: string | null;
    info?: string;
    houseType?: number | null;
  } ;
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


