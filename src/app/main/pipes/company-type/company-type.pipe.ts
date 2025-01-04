import { Pipe, PipeTransform } from '@angular/core';
import { Company } from '../../../core/models/company';

const COMPANIES = [
  new Company(1, 'АО СЗ ФК "АКСИОМА"', '123-456-7890'),
  new Company(2, 'ООО Предприятие «ИП К.И.Т.»', '987-654-3210'),
  new Company(3, 'ООО "СТЭЛ инвест"', '555-555-5555'),
];

@Pipe({
  name: 'companyType',
})
export class CompanyTypePipe implements PipeTransform {
  transform(id: number, ...args: unknown[]): unknown {
    return COMPANIES.reduce(
      (prev, curr) => (curr.id == id ? `${prev} ${curr.name}` : prev),
      ''
    );
  }
}
