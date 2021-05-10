import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightDataService {
  public allflightData: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor() { }

  storFlight(flightData: any){
    this.allflightData.next(flightData)
  }
  retrieveFlight(){
    return this.allflightData
  }
}
