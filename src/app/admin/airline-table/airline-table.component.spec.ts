import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { FlightService } from 'src/app/flight/flight.service';
import { AdminService } from '../admin.service';

import { AirlineTableComponent } from './airline-table.component';

describe('AirlineTableComponent', () => {
  let component: AirlineTableComponent;
  let fixture: ComponentFixture<AirlineTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, ReactiveFormsModule ],
      declarations: [ AirlineTableComponent ],
      providers: [ FlightService, AdminService, ConfirmDialogService, NgControl ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
