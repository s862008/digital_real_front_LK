import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.css'],
})
export class EditingComponent {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    //this.listing = this.listingService.getListingById(id); // Загрузите данные карточки товара
  }




  listing = [
    {
      title: '2 комнаты, 61.8 м²',
      address:
        'Новостройка, ЖК «Шестое чувство», ул. Композитора Ставонина, 55/9к2',
      kitchen: 'Кухня: . . . . . . . . . . . . . . . . 13.8 м²',
      floor: 'Этаж: . . . . . . . . . . . . . . . . 6',
      deadline: 'Срок сдачи: . . . . . . . . . . сдан',
      price: 'Не указана',
      img: '../../../../assets/img/house.png', // Заглушка для изображения
    },
  ];
  apartmentType: string | undefined;
  layoutType: string | undefined;
  floorNumber: string | undefined;
  totalFloors: string | undefined;
  numberOfRooms: string | undefined;
  viewFromWindow: string | undefined;
  balconyType: string | undefined;
  stoveType: string | undefined;
  bathroomType: string | undefined;
  finishingType: string | undefined;
  wallFinishing: string | undefined;
  ceilingFinishing: string | undefined;
  floorCovering: string | undefined;
  repairType: string | undefined;
  balconyGlazing: string | undefined;
  bathroomFinishing: string | undefined;
  radiatorType: string | undefined;
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
