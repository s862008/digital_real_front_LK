import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BusinessCabinetComponent} from "./components/business-cabinet/business-cabinet.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    BusinessCabinetComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'profile', component: ProfileComponent },
      { path: 'business', component: BusinessCabinetComponent },
      { path: '', redirectTo: 'business', pathMatch: 'full' },
    ])
  ]
})
export class BusinessModule { }
