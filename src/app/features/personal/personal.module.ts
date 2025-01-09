import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckbox, MatCheckboxModule} from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core'; // Импорт MatOptionModule
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; // Импорт MatSelectModule
import { RouterModule } from '@angular/router';
import { EditingComponent } from './editing/editing.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { InfoComponent } from './info/info.component';
import { OrderComponent } from './order/order.component';
import { PersonalCabinetComponent } from './personal-cabinet/personal-cabinet.component';
import { PolititcComponent } from './politic/politic.component';
import { ProfileComponent } from './profile/profile.component';
import { StatisticComponent } from './statistic/statistic.component';
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
  declarations: [
    PersonalCabinetComponent,
    ProfileComponent,
    InfoComponent,
    StatisticComponent,
    FavoriteComponent,
    OrderComponent,
    EditingComponent,
    PolititcComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    RouterModule.forChild([
      {
        path: '',
        component: PersonalCabinetComponent,
        children: [
          {path: '', redirectTo: 'order', pathMatch: 'full'},
          {path: 'profile', component: ProfileComponent},
          {path: 'order', component: OrderComponent},
          {path: 'favorite', component: FavoriteComponent},
          {path: 'stat', component: StatisticComponent},
          {path: 'editing', component: EditingComponent},
          {path: 'politic', component: PolititcComponent},
        ],
      },
      {
        path: 'info',
        component: InfoComponent,
      },
    ]),
    MatRadioModule,
    MatCheckboxModule,
  ],
  exports: [PersonalCabinetComponent],
})
export class PersonalModule {}
