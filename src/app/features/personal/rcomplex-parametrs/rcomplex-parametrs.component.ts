import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-rcomplex-parametrs',
  templateUrl: './rcomplex-parametrs.component.html',
  styleUrl: './rcomplex-parametrs.component.css'
})
export class RcomplexParametrsComponent {
  apartmentType: string | undefined;
  houseType: string | undefined;
  digitalizationClass: string | undefined;
  seismicResistance: string | undefined;
  deliveryYearStart: string | undefined;
  deliveryYearEnd: string | undefined;
  isHouseDelivered: boolean = false;
  ceilingHeight: string | undefined;
  numberOfLifts: string | undefined;
  isSmartHouse: boolean = false;
  isNotSmartHouse: boolean = false;
  apartmentsPerFloorStart: string | undefined;
  apartmentsPerFloorEnd: string | undefined;
  liftType: string | undefined;
  hasOwnBoilerRoom: boolean = false;
  hasNotOwnBoilerRoom: boolean = false;
  isNearbyTC: boolean = false;
  isNearbyFitness: boolean = false;
  isNearbyPark: boolean = false;
  isNearbySchool: boolean = false;
  isNearbyKindergarten: boolean = false;
  isNearbyPolyclinic: boolean = false;
  isNearbyBusStop: boolean = false;
  isNearbyCarService: boolean = false;
  isClosedYard: boolean = false;
  isNotClosedYard: boolean = false;
  radiatorType: string | undefined;
  isFurnitureWithout: boolean = false;
  isFurnitureInKitchen: boolean = false;
  isFurnitureInApartment: boolean = false;
  isParkingUnderground: boolean = false;
  isParkingMultilevel: boolean = false;
  isParkingOpenYard: boolean = false;
  isParkingClosedTerritory: boolean = false;
  saleMethod: string | undefined;
  hasApartmentGuarantee: boolean = false;
  hasNotApartmentGuarantee: boolean = false;
  isBookingOnline: boolean = false;
  isNotBookingOnline: boolean = false;
  isElectronicDeal: boolean = false;
  isNotElectronicDeal: boolean = false;
  hasPromo: boolean = false;
  hasNotPromo: boolean = false;
  isMortgageAvailable: boolean = false;
  isNotMortgageAvailable: boolean = false;
}
