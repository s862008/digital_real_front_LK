import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseTypeNamePipe } from './house-type-name.pipe';

@NgModule({
  exports: [HouseTypeNamePipe],
  declarations: [HouseTypeNamePipe],
  imports: [CommonModule],
})
export class HouseTypeNameModule {}
