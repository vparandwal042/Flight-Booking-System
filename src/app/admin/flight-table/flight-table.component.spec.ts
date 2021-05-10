import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { FlightService } from 'src/app/flight/flight.service';
import { AdminService } from '../admin.service';

import { FlightTableComponent } from './flight-table.component';

describe('FlightTableComponent', () => {
  let component: FlightTableComponent;
  let fixture: ComponentFixture<FlightTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, ReactiveFormsModule ],
      declarations: [ FlightTableComponent ],
      providers: [ FlightService, AdminService, ConfirmDialogService, NgControl ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
