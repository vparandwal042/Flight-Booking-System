import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public money1 = 2635;
  public money2 = 3160;
  public money3 = 3099;
  public money4 = 2099;
  public money5 = 3863;
  public money6 = 2064;
  public allTopDest: any
  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.flightService.getAllTopDest("top-dest").subscribe(topDest =>{
      this.allTopDest = topDest
      console.log(this.allTopDest)
    })
  }

}
