import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../flight.service';
import { PayService } from '../pay.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  flightDetails: any
  flightId: any
  depart: any;
  baseFare = 484;
  instantOff = 175;
  amountPayable: any
  options: any
  rzp1: any
  ticketForm: any
  submitted = false
  ticket: any;

  constructor(private activatedRoute: ActivatedRoute, 
    private flightService: FlightService,
    private payService: PayService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(data =>{
      this.flightId = data.id
    })

    this.flightService.getFlightById("flight/" + this.flightId).subscribe(flightData =>{
      this.flightDetails = flightData

      this.depart = this.flightDetails["departure"].split("-");
      this.flightDetails["year"] = this.depart[0]
      this.flightDetails["month"] = this.getMonth(Number(this.depart[1]))
      this.flightDetails["day"] = this.depart[2]

      this.amountPayable = this.flightDetails["fare"] - this.baseFare - this.instantOff;
      console.log(this.flightDetails["from"]);

    })

    this.ticketForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
    })

    this.options = {
      "key": "rzp_test_L1n39jPnCNcM5Z",
      "amount": "50000",
      "currency": "INR",
      "name": "Flight Booking System",
      "description": "",
      "image": "../../../assets/img/flight2.jpg",
      "order_id": "",
      "handler": function (response: any){  
          //alert(response.razorpay_payment_id);
          if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id < 1) {
            this.route_url = '/booking-details/' + this.flightId
          } else {
            this.route_url = '/ticket-details/'
          }
          location.href = this.route_url
          /*alert(response.razorpay_order_id);
          alert(response.razorpay_signature)*/
      },
      "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9999999999"
      },
      "notes": {
          "address": "Flight Booking Corporate Office"
      },
      "theme": {
          "color": "#123654"
      }
    };
  }

  pay(id: any){
    this.options.amount = this.amountPayable*100
    this.options.prefill.name = this.ticketForm.value.name
    this.options.prefill.email = this.ticketForm.value.email
    this.options.prefill.contact = this.ticketForm.value.mobile
    this.rzp1 = this.payService.nativeWindow.Razorpay(this.options);
    this.rzp1.open()
  }

  getMonth(month: any) {
    return ["Jan", "Feb","March","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"][month-1] || '';
  }
  get f(){ return this.ticketForm.controls }
  saveTicket(){
    this.submitted = true
    if(this.ticketForm.invalid){
      return
    }
    let ticketData = {
      "flightName": this.flightDetails["flightName"],
      "from": this.flightDetails["from"],
      "destination": this.flightDetails["destination"],
      "name": this.ticketForm.value.name,
      "email": this.ticketForm.value.email,
      "mobile": this.ticketForm.value.mobile,
      "timeDepart": this.flightDetails["timeDepart"],
      "departure": this.flightDetails["departure"]
    }
    this.flightService.bookFlight("flights/ticket", ticketData).subscribe(data =>{
      this.ticket = data
      console.log(this.ticket["_id"])
      this.pay(this.ticket["_id"])
      localStorage.setItem('ticket', JSON.stringify(this.ticket));
    })
  }

}
