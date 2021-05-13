import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  ticketDetails: any
  depart: any;
  constructor() { }

  ngOnInit(): void {
    this.ticketDetails = JSON.parse(localStorage.getItem('ticket') || '{}')
      this.depart = (this.ticketDetails["departure"] || "").split("-");
      this.ticketDetails["year"] = this.depart[0]
      this.ticketDetails["month"] = this.getMonth(Number(this.depart[1]))
      this.ticketDetails["day"] = this.depart[2]
    console.log(this.ticketDetails)
  }
  getMonth(month: any) {
    return ["Jan", "Feb","March","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"][month-1] || '';
  }

}
