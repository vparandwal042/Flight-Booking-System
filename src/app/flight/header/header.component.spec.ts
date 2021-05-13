import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, ReactiveFormsModule, RouterTestingModule, NgbModule ],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Flight Search Form check - should check flight search is valid or not if no values entered', ()=>{
    expect(component.flightSearch.valid).toBeFalsy();
  })
  it('Flight Search Form check - should check flight search is valid or not when values entered', ()=>{
    component.flightSearch.controls['from'].setValue('Pune');
    component.flightSearch.controls['destination'].setValue('Mumbai');
    component.flightSearch.controls['departure'].setValue('2015-05-11');

    expect(component.flightSearch.valid).toBeFalsy();
  })

  it('from field check - should check from field is invalid', ()=>{
    let from = component.flightSearch.controls['from'];
    expect(from.valid).toBeFalsy();
    expect(from.pristine).toBeTruthy();
    expect(from.errors['required']).toBeTruthy();
    from.setValue('Pune');
  })
  it('from field check - should check from field is entered', ()=>{
    let from = component.flightSearch.controls['from'];
    from.setValue('Pune');
    expect(from.errors).toBeNull();
  })

  it('destination field check - should check destination is invalid', ()=>{
    let destination = component.flightSearch.controls['destination'];
    expect(destination.valid).toBeFalsy();
    expect(destination.pristine).toBeTruthy();
    expect(destination.errors['required']).toBeTruthy();
    destination.setValue('Mumbai');
  })
  it('destination field check - should check destination field is entered', ()=>{
    let destination = component.flightSearch.controls['destination'];
    destination.setValue('Mumbai');
    expect(destination.errors).toBeNull();
  })

  it('departure field check - should check departure is invalid', ()=>{
    let departure = component.flightSearch.controls['departure'];
    expect(departure.valid).toBeFalsy();
    expect(departure.pristine).toBeTruthy();
    departure.setValue('2015-05-11');
  })
  it('departure field check - should check departure field is entered', ()=>{
    let departure = component.flightSearch.controls['departure'];
    departure.setValue('2015-05-11');
    expect(departure.errors).toBeDefined();
  })


  it('Login Form check - should check Login is valid or not if no values entered', ()=>{
    expect(component.LoginForm.valid).toBeFalsy();
  })
  it('Login Form check - should check Login is valid or not when values entered', ()=>{
    component.LoginForm.controls['email'].setValue('vishal@gmail.com');
    component.LoginForm.controls['password'].setValue('12345');

    expect(component.LoginForm.valid).toBeTruthy();
  })

  it('Login email field check - should check email field is invalid', ()=>{
    let email = component.LoginForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.errors['required']).toBeTruthy();
    email.setValue('vishal@gmail.com');
  })
  it('Login email field check - should check email field is entered', ()=>{
    let email = component.LoginForm.controls['email'];
    email.setValue('vishal@gmail.com');
    expect(email.errors).toBeNull();
  })

  it('Login password field check - should check password field errors', ()=>{
    let password = component.LoginForm.controls['password'];
    expect(password.errors['required']).toBeTruthy();
    password.setValue('12345');
  });
  it('Login password field check - should check password field validity', ()=>{
    let password = component.LoginForm.controls['password'];
    password.setValue('12345');
    expect(password.errors).toBeNull();
    expect(password.valid).toBeTruthy();
  })



  it('SignUp Form check - should check SignUp is valid or not if no values entered', ()=>{
    expect(component.signUpForm.valid).toBeFalsy();
  })
  it('Sign Up Form check - should check Sign Up is valid or not when values entered', ()=>{
    component.signUpForm.controls['name'].setValue('Vishal');
    component.signUpForm.controls['email'].setValue('vishal@gmail.com');
    component.signUpForm.controls['password'].setValue('12345');
    component.signUpForm.controls['mobile'].setValue('9876543212');

    expect(component.signUpForm.valid).toBeTruthy();
  })

  it('Sign Up name field check - should check name field is invalid', ()=>{
    let name = component.signUpForm.controls['name'];
    expect(name.valid).toBeFalsy();
    expect(name.pristine).toBeTruthy();
    expect(name.errors['required']).toBeTruthy();
    name.setValue('Vishal');
  })
  it('Sign Up name field check - should check name field is entered', ()=>{
    let name = component.signUpForm.controls['name'];
    name.setValue('Vishal');
    expect(name.errors).toBeNull();
  })

  it('Sign Up email field check - should check email field is invalid', ()=>{
    let email = component.signUpForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.errors['required']).toBeTruthy();
    email.setValue('vishal@gmail.com');
  })
  it('Sign Up email field check - should check email field is entered', ()=>{
    let email = component.signUpForm.controls['email'];
    email.setValue('vishal@gmail.com');
    expect(email.errors).toBeNull();
  })

  it('Sign Up password field check - should check password field errors', ()=>{
    let password = component.signUpForm.controls['password'];
    expect(password.errors['required']).toBeTruthy();
    password.setValue('12345');
  });
  it('Sign Up password field check - should check password field validity', ()=>{
    let password = component.signUpForm.controls['password'];
    password.setValue('12345');
    expect(password.errors).toBeNull();
    expect(password.valid).toBeTruthy();
  })

  it('Sign Up mobile field check - should check mobile field errors', ()=>{
    let mobile = component.signUpForm.controls['mobile'];
    expect(mobile.errors['required']).toBeTruthy();
    mobile.setValue('9876543212');
  });
  it('Sign Up mobile field check - should check mobile field validity', ()=>{
    let mobile = component.signUpForm.controls['mobile'];
    mobile.setValue('9876543212');
    expect(mobile.errors).toBeNull();
    expect(mobile.valid).toBeTruthy();
  })

});
