import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApartmentTypeModule } from '../../pipes/apartment-type/apartment-type.module';
import { CompanyTypeModule } from '../../pipes/company-type/company-type.module';
import { HouseTypeNameModule } from '../../pipes/house-type-name/house-type-name.module';
import { NumberOfRoomsModule } from '../../pipes/number-of-rooms/number-of-rooms.module';
import { ApartmentCardComponent } from './apartment-card.component';

@NgModule({
  exports: [ApartmentCardComponent],
  declarations: [ApartmentCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    HouseTypeNameModule,
    CompanyTypeModule,
    NumberOfRoomsModule,
    ApartmentTypeModule,
  ],
})
export class ApartmentCardModule {}
