import { NgModule } from '@angular/core';

import { TabMenuComponent } from './tab-menu.component';
import { TabHeaderItemComponent } from './tab-header-item/tab-header-item.component';
import { TabBodyItemComponent } from './tab-body-item/tab-body-item.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [TabMenuComponent],
  declarations: [
    TabMenuComponent,
    TabHeaderItemComponent,
    TabBodyItemComponent,
  ],
  providers: [],
})
export class TabMenuModule {}
