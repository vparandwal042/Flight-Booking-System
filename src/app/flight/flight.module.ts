import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { FlightRoutingModule } from './flight-routing.module';
import { FlightComponent } from './flight.component';
import { AboutComponent } from './about/about.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { AirlinesComponent } from './airlines/airlines.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavComponent } from './nav/nav.component';
import { FlightSearchComponent } from './flight-search/flight-search.component'
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';

@NgModule({
  declarations: [
    FlightComponent,
    AboutComponent,
    FlightListComponent,
    AirlinesComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UserProfileComponent,
    NavComponent,
    FlightSearchComponent,
    TicketDetailsComponent,
    BookingDetailsComponent
  ],
  imports: [
    CommonModule,
    FlightRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ]
})
export class FlightModule { }
