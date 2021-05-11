import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuardService } from '../admin-auth-guard.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin.component'
;
import { AirlineTableComponent } from './airline-table/airline-table.component';
import { FlightTableComponent } from './flight-table/flight-table.component';
import { TopDestTableComponent } from './top-dest-table/top-dest-table.component';
import { UserTableComponent } from './user-table/user-table.component';
const routes: Routes = [
  { path: '', component: AdminComponent ,
    children: [
      { path: 'admin-dashboard/:id', component: AdminDashboardComponent },
      { path: 'airline-table', component: AirlineTableComponent, canActivate: [AdminAuthGuardService] },
      { path: 'flight-table', component: FlightTableComponent, canActivate: [AdminAuthGuardService] },
      { path: 'topDest-table', component: TopDestTableComponent, canActivate: [AdminAuthGuardService] },
      { path: 'user-table', component: UserTableComponent, canActivate: [AdminAuthGuardService] }
    ]
  },
  { path: 'admin-login', component: AdminLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
