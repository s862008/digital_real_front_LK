import {Company} from "../models/company";

export class FormatterUtils {

  public static formatRoom(numberOfRooms: number): string | undefined {
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(numberOfRooms)) {
      return `${numberOfRooms}-ком. квартира, `;
    } else if (numberOfRooms === 0) {
      return "Свободная планировка, ";
    } else if (numberOfRooms === 0.5) {
      return "Студия, ";
    } else if (numberOfRooms !== Math.floor(numberOfRooms)) {
      return `${numberOfRooms}-евро, `;
    } else {
      return "Многокомнатная квартира, ";
    }
  }

  public static nameApartType(apartmentType: string): string {
    if (apartmentType == '1') {
      return 'квартира'
    } else {
      return 'апартаменты'
    }
    return '';

  }

  public static nameCompany(id: number): string | undefined {
    const companies = [
      new Company(1, 'АО СЗ ФК "АКСИОМА"', '123-456-7890'),
      new Company(2, 'ООО Предприятие «ИП К.И.Т.»', '987-654-3210'),
      new Company(3, 'ООО "СТЭЛ инвест"', '555-555-5555')
    ];

    let lst: string = "";
    companies.forEach((company) => {
      if (company.id == id) {
        lst += `${company.name}`;
      }
    });

    return lst;
  }

  public static nameHouseType(index: number): string  {

  let houseTypes: string[] = ["Кирпичный", "Монолитный", "Панельный", "Кирпично-монолитный", "Блочный", "Другой"];

    if (houseTypes != null && houseTypes.length >= index) {
      return houseTypes[index - 1];
    }
    return "";
  }


  public static formatPrice(value: any): string | undefined {
    if (value == null || !/^\d+$/.test(value)) {
      return "Не указана"
    } else {

      let num = String(value)
      if (num.length > 3) {
        num = this.formatPrice(num.substring(0, num.length - 3)) + " " + num.substring(num.length - 3, num.length)
      }
      return num;
    }
  }
}
