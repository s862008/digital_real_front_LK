import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyTypePipe } from './company-type.pipe';

@NgModule({
  declarations: [CompanyTypePipe],
  exports: [CompanyTypePipe],
  imports: [CommonModule],
})
export class CompanyTypeModule {}
