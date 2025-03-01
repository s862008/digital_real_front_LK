import { NgModule } from '@angular/core';

import { StatementFormComponent } from './components/statement-form/statement-form.component';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannerModule } from '../../components/banner/banner.module';
import { HomeRouterModule } from './home-router.module';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    StatementFormComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BannerModule,
    HomeRouterModule,
    SharedModule
  ],
  exports: [HomeComponent],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule {}
