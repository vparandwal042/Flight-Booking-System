import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { FlightService } from 'src/app/flight/flight.service';
import { AdminService } from '../admin.service';

import { AirlineTableComponent } from './airline-table.component';

describe('AirlineTableComponent', () => {
  let component: AirlineTableComponent;
  let fixture: ComponentFixture<AirlineTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule, ReactiveFormsModule, FormsModule, Ng2SearchPipeModule],
      declarations: [ AirlineTableComponent ],
      providers: [ FlightService, AdminService, ConfirmDialogService ]
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

  it('Airline Form check - should check Airline is valid or not if no values entered', ()=>{
    expect(component.airlineForm.valid).toBeFalsy();
  })
  it('Airline Form check - should check Airline is valid or not when values entered', ()=>{
    component.airlineForm.controls['airlineName'].setValue('Spice Jet');

    expect(component.airlineForm.valid).toBeFalsy();
  })

  it('Airline Name field check - should check Airline Name field is invalid', ()=>{
    let airlineName = component.airlineForm.controls['airlineName'];
    expect(airlineName.valid).toBeFalsy();
    expect(airlineName.pristine).toBeTruthy();
    expect(airlineName.errors['required']).toBeTruthy();
    airlineName.setValue('Spice Jet');
  })
  it('Airline Name field check - should check Airline Name field is entered', ()=>{
    let airlineName = component.airlineForm.controls['airlineName'];
    airlineName.setValue('Spice Jet');
    expect(airlineName.errors).toBeNull();
  })


  it('Update Airline Form check - should check Update Airline is valid or not if no values entered', ()=>{
    expect(component.updateAirlineForm.valid).toBeFalsy();
  })
  it('Update Airline Form check - should check Update Airline is valid or not when values entered', ()=>{
    component.updateAirlineForm.controls['airlineName'].setValue('Spice Jet');

    expect(component.updateAirlineForm.valid).toBeFalsy();
  })

  it('Update Airline Name field check - should check Update Airline Name field is invalid', ()=>{
    let airlineName = component.updateAirlineForm.controls['airlineName'];
    expect(airlineName.valid).toBeFalsy();
    expect(airlineName.pristine).toBeTruthy();
    expect(airlineName.errors['required']).toBeTruthy();
    airlineName.setValue('Spice Jet');
  })
  it('Update Airline Name field check - should check Update Airline Name field is entered', ()=>{
    let airlineName = component.updateAirlineForm.controls['airlineName'];
    airlineName.setValue('Spice Jet');
    expect(airlineName.errors).toBeNull();
  })

});
