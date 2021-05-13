import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  readonly ROOT_URL: any;
  constructor(private http: HttpClient) { 
    this.ROOT_URL = "http://localhost:3000";
  }

  addAirline(uri: string, airlineName: string, airlineImage: File){
    var formData: any = new FormData();
    formData.append("airlineName", airlineName);
    formData.append("airlineImage", airlineImage);
    return this.http.post(`${this.ROOT_URL}/${uri}`, formData);
  }
  addTopDest(uri: string, from: string, destination: string, cityImage: File, fare: string){
    var formData: any = new FormData();
    formData.append("from", from);
    formData.append("destination", destination);
    formData.append("fare", fare);
    formData.append("cityImage", cityImage);
    return this.http.post(`${this.ROOT_URL}/${uri}`, formData);
  }
  addFlight(uri: string, 
    flightName: string,
    from: string, 
    destination: string, 
    departure: string,
    timeDepart:  string,
    timeArrival: string,
    seats: string,
    fare: string,
    flightImage: File,
    time: string){
    
      var formData: any = new FormData();
      formData.append("flightName", flightName);
      formData.append("from", from);
      formData.append("destination", destination);
      formData.append("departure", departure);
      formData.append("timeDepart", timeDepart);
      formData.append("timeArrival", timeArrival);
      formData.append("seats", seats);
      formData.append("fare", fare);
      formData.append("flightImage", flightImage);
      formData.append("time", time);
      return this.http.post(`${this.ROOT_URL}/${uri}`, formData);
  }

  getAirline(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);   
  }
  getFlight(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);   
  }
  getTopDest(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);   
  }
  getUser(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);   
  }

  updateAirline(uri: string, airlineName: string, airlineImage: File){
    var formData: any = new FormData();
    formData.append("airlineName", airlineName);
    formData.append("airlineImage", airlineImage);
    return this.http.put(`${this.ROOT_URL}/${uri}`, formData);
  }
  updateFlight(uri: string, 
    flightName: string,
    from: string, 
    destination: string, 
    departure: string,
    timeDepart:  string,
    timeArrival: string,
    seats: string,
    fare: string,
    flightImage: File,
    time: string){
    
      var formData: any = new FormData();
      formData.append("flightName", flightName);
      formData.append("from", from);
      formData.append("destination", destination);
      formData.append("departure", departure);
      formData.append("timeDepart", timeDepart);
      formData.append("timeArrival", timeArrival);
      formData.append("seats", seats);
      formData.append("fare", fare);
      formData.append("flightImage", flightImage);
      formData.append("time", time);
      
      return this.http.put(`${this.ROOT_URL}/${uri}`, formData);
  }
  updateTopDest(uri: string, from: string, destination: string, cityImage: File, fare: string){
    var formData: any = new FormData();
    formData.append("from", from);
    formData.append("destination", destination);
    formData.append("cityImage", cityImage);
    formData.append("fare", fare);
    return this.http.put(`${this.ROOT_URL}/${uri}`, formData);
  }
  updateUser(uri: string, form: any){
    return this.http.put(`${this.ROOT_URL}/${uri}`, form);
  }

  deleteAirline(uri: string){
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
  deleteFlights(uri: string){
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
  deleteTopDest(uri: string){
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
  deleteUser(uri: string){
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  adminLogin(uri: string, form: any){
    return this.http.post(`${this.ROOT_URL}/${uri}`, form);
  }
}
