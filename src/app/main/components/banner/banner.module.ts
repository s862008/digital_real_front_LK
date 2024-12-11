import { NgModule } from '@angular/core';

import { BannerComponent } from './banner.component';
import { RouterModule } from '@angular/router';
import { ContainerModule } from '../container/container.module';

@NgModule({
  imports: [RouterModule, ContainerModule],
  exports: [BannerComponent],
  declarations: [BannerComponent],
  providers: [],
})
export class BannerModule {}
