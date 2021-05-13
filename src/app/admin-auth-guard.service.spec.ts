import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ConfirmDialogService } from './confirm-dialog/confirm-dialog.service';
import { FlightService } from './flight/flight.service';

describe('AdminAuthGuardService', () => {
  let service: AdminAuthGuardService;
  let httpMock: HttpTestingController;
  let http: HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
      providers: [AdminAuthGuardService, ConfirmDialogService]
    });
    service = TestBed.inject(AdminAuthGuardService);
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
