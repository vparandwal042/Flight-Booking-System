import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { FlightService } from 'src/app/flight/flight.service';
import { AdminService } from '../admin.service';

import { UserTableComponent } from './user-table.component';

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, ReactiveFormsModule, FormsModule, Ng2SearchPipeModule ],
      declarations: [ UserTableComponent ],
      providers: [ FlightService, AdminService, ConfirmDialogService, NgControl ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('User Form check - should check User is valid or not if no values entered', ()=>{
    expect(component.UserForm.valid).toBeFalsy();
  })
  it('User Form check - should check User is valid or not when values entered', ()=>{
    component.UserForm.controls['name'].setValue('Vishal');
    component.UserForm.controls['email'].setValue('vishal@gmail.com');
    component.UserForm.controls['password'].setValue('12345');
    component.UserForm.controls['mobile'].setValue('9876543212');

    expect(component.UserForm.valid).toBeTruthy();
  })

  it('User name field check - should check name field is invalid', ()=>{
    let name = component.UserForm.controls['name'];
    expect(name.valid).toBeFalsy();
    expect(name.pristine).toBeTruthy();
    expect(name.errors['required']).toBeTruthy();
    name.setValue('Vishal');
  })
  it('User name field check - should check name field is entered', ()=>{
    let name = component.UserForm.controls['name'];
    name.setValue('Vishal');
    expect(name.errors).toBeNull();
  })

  it('User email field check - should check email field is invalid', ()=>{
    let email = component.UserForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.errors['required']).toBeTruthy();
    email.setValue('vishal@gmail.com');
  })
  it('User email field check - should check email field is entered', ()=>{
    let email = component.UserForm.controls['email'];
    email.setValue('vishal@gmail.com');
    expect(email.errors).toBeNull();
  })

  it('User mobile field check - should check mobile field errors', ()=>{
    let mobile = component.UserForm.controls['mobile'];
    expect(mobile.errors['required']).toBeTruthy();
    mobile.setValue('9876543212');
  });
  it('User mobile field check - should check mobile field validity', ()=>{
    let mobile = component.UserForm.controls['mobile'];
    mobile.setValue('9876543212');
    expect(mobile.errors).toBeNull();
    expect(mobile.valid).toBeTruthy();
  })


  it('Update User Form check - should check Update User is valid or not if no values entered', ()=>{
    expect(component.updateUserForm.valid).toBeFalsy();
  })
  it('Update User Form check - should check Update User is valid or not when values entered', ()=>{
    component.updateUserForm.controls['name'].setValue('Vishal');
    component.updateUserForm.controls['email'].setValue('vishal@gmail.com');
    component.updateUserForm.controls['mobile'].setValue('9876543212');

    expect(component.updateUserForm.valid).toBeTruthy();
  })

  it('Update User name field check - should check name field is invalid', ()=>{
    let name = component.updateUserForm.controls['name'];
    expect(name.valid).toBeFalsy();
    expect(name.pristine).toBeTruthy();
    expect(name.errors['required']).toBeTruthy();
    name.setValue('Vishal');
  })
  it('Update User name field check - should check name field is entered', ()=>{
    let name = component.updateUserForm.controls['name'];
    name.setValue('Vishal');
    expect(name.errors).toBeNull();
  })

  it('Update User email field check - should check email field is invalid', ()=>{
    let email = component.updateUserForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.errors['required']).toBeTruthy();
    email.setValue('vishal@gmail.com');
  })
  it('Update User email field check - should check email field is entered', ()=>{
    let email = component.updateUserForm.controls['email'];
    email.setValue('vishal@gmail.com');
    expect(email.errors).toBeNull();
  })

  it('Update User mobile field check - should check mobile field errors', ()=>{
    let mobile = component.updateUserForm.controls['mobile'];
    expect(mobile.errors['required']).toBeTruthy();
    mobile.setValue('9876543212');
  });
  it('Update User mobile field check - should check mobile field validity', ()=>{
    let mobile = component.updateUserForm.controls['mobile'];
    mobile.setValue('9876543212');
    expect(mobile.errors).toBeNull();
    expect(mobile.valid).toBeTruthy();
  })
});
