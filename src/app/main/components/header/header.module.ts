import { NgModule } from '@angular/core';

import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { TabMenuModule } from '../tab-menu/tab-menu.module';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { CommonModule } from '@angular/common';
import { HeaderBurgerButtonComponent } from './header-burger-button/header-burger-button.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    TabMenuModule,
    CommonModule,
    RouterModule,
  ],
  exports: [HeaderComponent],
  declarations: [
    HeaderComponent,
    HeaderMenuComponent,
    HeaderBurgerButtonComponent,
  ],
  providers: [],
})
export class HeaderModule {}
