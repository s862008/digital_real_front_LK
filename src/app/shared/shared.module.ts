import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PriceFormatterDirective} from "../main/directives/price-formatter.directive";


@NgModule({
  declarations: [
    PriceFormatterDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PriceFormatterDirective,
  ]
})
export class SharedModule {}
