
export interface RComplex {
  id: bigint;
  name: string;
  address: string;
  company: string;
  priceMax: number;
  priceMin: number;
  phone: string;
  logo: string;
  dueYear: string;
  dueQuart: number;
  titlePicture: string;
}

export interface RComplexFull extends RComplex {

  info: string;
  map:string;


}

export interface RComplexPopular extends RComplex {

  orderByRooms: any;
  countApartments: number;



}
export class RComplexRandomInstance implements RComplexFull {
  id: bigint;
  name: string;
  address: string;
  company: string;
  priceMax: number;
  priceMin: number;
  phone: string;
  logo: string;
  dueYear: string;
  dueQuart: number;
  titlePicture: string;
  info: string;
  map: string;

  constructor() {
    this.id = BigInt(Math.floor(Math.random() * 1000000)); // Генерация случайного id
    this.name = this.randomString(10); // Генерация случайного имени
    this.address = this.randomString(20); // Генерация случайного адреса
    this.company = this.randomString(15); // Генерация случайного названия компании
    this.priceMax = this.randomPrice(); // Генерация случайной максимальной цены
    this.priceMin = this.randomPrice(); // Генерация случайной минимальной цены
    this.phone = this.randomPhone(); // Генерация случайного телефона
    this.logo = "/assets/img/logo.png";
    this.dueYear = this.randomYear(); // Генерация случайного года
    this.dueQuart = Math.floor(Math.random() * 4) + 1; // Генерация случайной четверти
    this.titlePicture = "/assets/img/стел жк 11.png"
    this.info = this.randomString(500); // Генерация случайной информации
    this.map = this.randomString(15); // Генерация случайной карты
  }

  private randomName(length: number): string {
    const randomNames = ['Complex A', 'Complex B', 'Complex C', 'Complex D', 'Complex E'];
    let result = randomNames[Math.floor(Math.random() * randomNames.length)];
    return result;
  }


  private randomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOP QRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    let result = '';
    for (let i = 0; i < length; i++) {
      if( (i%10) == 0){
        result +="\n"
      }
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  private randomPrice(): number {
    return parseFloat((Math.random() * 1000).toFixed(2)); // Генерация случайной цены от 0 до 1000
  }

  private randomPhone(): string {
    const areaCode = Math.floor(Math.random() * 900) + 100; // Генерация случайного кода области
    const number = Math.floor(Math.random() * 9000000) + 1000000; // Генерация случайного номера
    return `+1-${areaCode}-${number}`; // Форматирование номера телефона
  }

  private randomYear(): string {
    const year = Math.floor(Math.random() * (2025 - 2020 + 1)) + 2020; // Генерация случайного года от 2020 до 2025
    return year.toString();
  }
}

