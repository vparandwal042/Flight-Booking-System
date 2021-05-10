import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  readonly ROOT_URL: any;

  constructor(private http: HttpClient) { 
    this.ROOT_URL = "http://localhost:3000";
  }

  getAllFlights(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);  
  }
  getAllUsers(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }
  getAllTopDest(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }
  getAllAirlines(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  getFlights(uri: string, form: any){
    return this.http.post(`${this.ROOT_URL}/${uri}`, form);
  }
  getAirline(uri: string, form: any){
    return this.http.post(`${this.ROOT_URL}/${uri}`, form);
  }
  getFlightById(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`)
  }

  signUp(uri: string, form: any){ // user/signup
    return this.http.post(`${this.ROOT_URL}/${uri}`, form);
  }
  login(uri: string, form: any){
    return this.http.post(`${this.ROOT_URL}/${uri}`, form);
  }
  bookFlight(uri: string, form: any){
    console.log(form, uri)
    return this.http.post(`${this.ROOT_URL}/${uri}`, form);
  }
}
