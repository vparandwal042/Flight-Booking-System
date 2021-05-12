import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';
import { AboutComponent } from './about/about.component';
import { AirlinesComponent } from './airlines/airlines.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightComponent } from './flight.component';
import { NavComponent } from './nav/nav.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
const routes: Routes = [
  { path: '', component: FlightComponent,
    children: [
      { path: 'airlines', component: AirlinesComponent },
      { path: 'about', component: AboutComponent },
      { path: 'flight-list', component: FlightListComponent }
    ]
  },
  { path: 'nav', component: NavComponent },
  { path: 'flight-search', component: FlightSearchComponent },
  { path: 'ticket-details', component: TicketDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'booking-details/:id', component: BookingDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'user/:id', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
