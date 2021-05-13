import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuardService } from './auth-guard.service';
import { ConfirmDialogService } from './confirm-dialog/confirm-dialog.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let httpMock: HttpTestingController;
  let http: HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
      providers: [AuthGuardService, ConfirmDialogService]
    });
    service = TestBed.inject(AuthGuardService);
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
