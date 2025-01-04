import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { AuthService } from './core/auth/auth-service';
import { authInterceptorProvider } from './core/auth/interseptors/auth-interceptor';
import { fakeBackendProvider } from './core/mock-backend/fake-backend.interceptor';
import { DataService } from './core/services/data.service';
import { ApartmentCardModule } from './main/components/apartment-card/apartment-card.module';
import { BannerModule } from './main/components/banner/banner.module';
import { ChosenParametersComponent } from './main/components/choosed-parameters/chosen-parameters.component';
import { ContainerModule } from './main/components/container/container.module';
import { FooterComponent } from './main/components/footer/footer.component';
import { HeaderModule } from './main/components/header/header.module';
import { LoginDialogComponent } from './main/components/login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from './main/components/registration-dialog/registration-dialog.component';
import { SmartParametersComponent } from './main/components/smart-parameters/smart-parameters.component';
import { ApartmentComponent } from './main/pages/apartment/apartment.component';
import { FilterSearchComponent } from './main/pages/filter-search/filter-search.component';
import { NotFoundComponent } from './main/pages/not-found/not-found.component';
import { RComplexComponent } from './main/pages/residential-complex/r-complex.component';
import { SearchComponent } from './main/pages/smart-search/search.component';
import { PricePipe } from './main/pipes/price.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    FilterSearchComponent,
    SearchComponent,
    ApartmentComponent,
    RComplexComponent,
    SmartParametersComponent,
    ChosenParametersComponent,
    PricePipe,
    LoginDialogComponent,
    RegistrationDialogComponent,
  ],
  imports: [
    HeaderModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSliderModule,
    MatToolbarModule,
    TooltipModule.forRoot(),
    HttpClientModule,
    NotFoundComponent,
    BannerModule,
    ContainerModule,
    ApartmentCardModule,
    MatPaginatorModule,
  ],
  providers: [
    DataService,
    AuthService,
    authInterceptorProvider,
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
