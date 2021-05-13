import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminLoginComponent } from './admin-login.component';

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let fixture: ComponentFixture<AdminLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
      declarations: [ AdminLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Admin Form check - should check SignUp is valid or not if no values entered', ()=>{
    expect(component.adminForm.valid).toBeFalsy();
  })
  it('Admin Form check - should check Admin is valid or not when values entered', ()=>{
    component.adminForm.controls['email'].setValue('admin@gmail.com');
    component.adminForm.controls['password'].setValue('admin1234');

    expect(component.adminForm.valid).toBeTruthy();
  })

  it('Admin email field check - should check email field is invalid', ()=>{
    let email = component.adminForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.errors['required']).toBeTruthy();
    email.setValue('vishal@gmail.com');
  })
  it('Admin email field check - should check email field is entered', ()=>{
    let email = component.adminForm.controls['email'];
    email.setValue('vishal@gmail.com');
    expect(email.errors).toBeNull();
  })

  it('Admin password field check - should check password field errors', ()=>{
    let password = component.adminForm.controls['password'];
    expect(password.errors['required']).toBeTruthy();
    password.setValue('12345');
  });
  it('Admin password field check - should check password field validity', ()=>{
    let password = component.adminForm.controls['password'];
    password.setValue('12345');
    expect(password.errors).toBeNull();
    expect(password.valid).toBeTruthy();
  })

});
