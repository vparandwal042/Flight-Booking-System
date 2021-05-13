import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { BookingDetailsComponent } from './booking-details.component';

describe('BookingDetailsComponent', () => {
  let component: BookingDetailsComponent;
  let fixture: ComponentFixture<BookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule],
      declarations: [ BookingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Ticket Form check - should check SignUp is valid or not if no values entered', ()=>{
    expect(component.ticketForm.valid).toBeFalsy();
  })
  it('Ticket Form check - should check Ticket is valid or not when values entered', ()=>{
    component.ticketForm.controls['name'].setValue('Vishal');
    component.ticketForm.controls['email'].setValue('vishal@gmail.com');
    component.ticketForm.controls['mobile'].setValue('9876543212');

    expect(component.ticketForm.valid).toBeTruthy();
  })

  it('Ticket name field check - should check name field is invalid', ()=>{
    let name = component.ticketForm.controls['name'];
    expect(name.valid).toBeFalsy();
    expect(name.pristine).toBeTruthy();
    expect(name.errors['required']).toBeTruthy();
    name.setValue('Vishal');
  })
  it('Ticket name field check - should check name field is entered', ()=>{
    let name = component.ticketForm.controls['name'];
    name.setValue('Vishal');
    expect(name.errors).toBeNull();
  })

  it('Ticket email field check - should check email field is invalid', ()=>{
    let email = component.ticketForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.errors['required']).toBeTruthy();
    email.setValue('vishal@gmail.com');
  })
  it('Ticket email field check - should check email field is entered', ()=>{
    let email = component.ticketForm.controls['email'];
    email.setValue('vishal@gmail.com');
    expect(email.errors).toBeNull();
  })

  it('Ticket mobile field check - should check mobile field errors', ()=>{
    let mobile = component.ticketForm.controls['mobile'];
    expect(mobile.errors['required']).toBeTruthy();
    mobile.setValue('9876543212');
  });
  it('Ticket mobile field check - should check mobile field validity', ()=>{
    let mobile = component.ticketForm.controls['mobile'];
    mobile.setValue('9876543212');
    expect(mobile.errors).toBeNull();
    expect(mobile.valid).toBeTruthy();
  })

});
