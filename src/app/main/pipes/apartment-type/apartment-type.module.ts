import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartmentTypePipe } from './apartment-type.pipe';

@NgModule({
  exports: [ApartmentTypePipe],
  declarations: [ApartmentTypePipe],
  imports: [CommonModule],
})
export class ApartmentTypeModule {}
