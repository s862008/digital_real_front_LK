export class Company {
  id: number;
  name: string;
  phone: string;

  constructor(id: number = 0, name: string = "", phone: string = "") {
    this.id = id;
    this.name = name;
    this.phone = phone;
  }
}
