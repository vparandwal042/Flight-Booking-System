import { TestBed } from '@angular/core/testing';
import {HttpClient, HttpClientModule, } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { FlightService } from './flight.service';

describe('FlightService', () => {
  let service: FlightService;
  let httpMock: HttpTestingController;
  let http: HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [FlightService]
    });
    service = TestBed.inject(FlightService);
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
