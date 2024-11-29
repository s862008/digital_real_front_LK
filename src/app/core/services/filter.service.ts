import { Injectable } from '@angular/core';
import {FilterSearch} from "../models/search";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterData: FilterSearch = {
    priceMin: '1000000',
    priceMax: '5000000',
    areaTotalMin: '10',
    areaTotalMax: '50',
    isAtelier: false,
    isOne: false,
    isTwo: false,
    isThree: false,
    isFour: false,
    isFivePlus: false
  };

  setFilterData(data: FilterSearch) {
    this.filterData = data;
  }

  getFilterData() {
    return this.filterData;
  }

  clearFilterData(){
    return this.filterData = {
    priceMin: '',
    priceMax: '',
    areaTotalMin: '',
    areaTotalMax: '',
    isAtelier: false,
    isOne: false,
    isTwo: false,
    isThree: false,
    isFour: false,
    isFivePlus: false
  };
 }

 numberOfRooms(filter: FilterSearch): string [] | null {
    let numberOfRooms: string [] = []
   if (filter.isAtelier){
    // numberOfRooms.push('Студия');
     numberOfRooms.push('0.5');}
   if (filter.isOne){
     // numberOfRooms.push('1 комната');
     numberOfRooms.push('0.5');
     numberOfRooms.push('1');
     numberOfRooms.push('1.5');}
   if (filter.isTwo){
     // numberOfRooms.push('2 комнаты');
     numberOfRooms.push('2');
     numberOfRooms.push('2.5');}
   if (filter.isThree){
     // numberOfRooms.push('3 комнаты');
     numberOfRooms.push('3');
     numberOfRooms.push('3.5');}
   if (filter.isFour){
     // numberOfRooms.push('4 комнаты');
     numberOfRooms.push('4');}
   if (filter.isFivePlus){
     // numberOfRooms.push('5 комнат и более');
     numberOfRooms.push('5');
     numberOfRooms.push('6');
     numberOfRooms.push('7');
     numberOfRooms.push('8');
     numberOfRooms.push('9');
     numberOfRooms.push('10');
   }

    return numberOfRooms.length > 0 ? numberOfRooms : null;
  }

}
