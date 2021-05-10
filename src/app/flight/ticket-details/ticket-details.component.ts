import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayService } from '../pay.service';
import { FlightService } from '../flight.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
