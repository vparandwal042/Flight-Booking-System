import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FlightTableComponent } from './flight-table/flight-table.component';
import { AirlineTableComponent } from './airline-table/airline-table.component';
import { TopDestTableComponent } from './top-dest-table/top-dest-table.component';
import { UserTableComponent } from './user-table/user-table.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [
    AdminComponent,
    AirlineTableComponent,
    FlightTableComponent,
    TopDestTableComponent,
    UserTableComponent,
    AdminDashboardComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ]
})
export class AdminModule { }
