import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { FlightService } from 'src/app/flight/flight.service';
import { AdminService } from '../admin.service';

import { TopDestTableComponent } from './top-dest-table.component';

describe('TopDestTableComponent', () => {
  let component: TopDestTableComponent;
  let fixture: ComponentFixture<TopDestTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, ReactiveFormsModule, FormsModule, Ng2SearchPipeModule ],
      declarations: [ TopDestTableComponent ],
      providers: [ FlightService, AdminService, ConfirmDialogService, NgControl ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Top Destination Form check - should check Top Destination is valid or not if no values entered', ()=>{
    expect(component.topDestForm.valid).toBeFalsy();
  })
  it('Top Destination Form check - should check Top Destination is valid or not when values entered', ()=>{
    component.topDestForm.controls['from'].setValue('Delhi');
    component.topDestForm.controls['destination'].setValue('Mumbai');
    component.topDestForm.controls['fare'].setValue('3919');

    expect(component.topDestForm.valid).toBeFalsy();
  })

  it('Top Destination from field check - should check Top Destination from field is invalid', ()=>{
    let from = component.topDestForm.controls['from'];
    expect(from.valid).toBeFalsy();
    expect(from.pristine).toBeTruthy();
    expect(from.errors['required']).toBeTruthy();
    from.setValue('Delhi');
  })
  it('Top Destination from field check - should check Top Destination from field is entered', ()=>{
    let from = component.topDestForm.controls['from'];
    from.setValue('Delhi');
    expect(from.errors).toBeNull();
  })

  it('Top Destination destination field check - should check Top Destination destination field is invalid', ()=>{
    let destination = component.topDestForm.controls['destination'];
    expect(destination.valid).toBeFalsy();
    expect(destination.pristine).toBeTruthy();
    expect(destination.errors['required']).toBeTruthy();
    destination.setValue('Mumbai');
  })
  it('Top Destination destination field check - should check Top Destination destination field is entered', ()=>{
    let destination = component.topDestForm.controls['destination'];
    destination.setValue('Mumbai');
    expect(destination.errors).toBeNull();
  })

  it('Top Destination fare field check - should check Top Destination fare field is invalid', ()=>{
    let fare = component.topDestForm.controls['fare'];
    expect(fare.valid).toBeFalsy();
    expect(fare.pristine).toBeTruthy();
    expect(fare.errors['required']).toBeTruthy();
    fare.setValue('3919');
  })
  it('Top Destination fare field check - should check Top Destination fare field is entered', ()=>{
    let fare = component.topDestForm.controls['fare'];
    fare.setValue('3919');
    expect(fare.errors).toBeNull();
  })


  it('Update Top Destination Form check - should check Update Top Destination is valid or not if no values entered', ()=>{
    expect(component.updateTopDestForm.valid).toBeFalsy();
  })
  it('Update Top Destination Form check - should check Update Top Destination is valid or not when values entered', ()=>{
    component.updateTopDestForm.controls['from'].setValue('Delhi');
    component.updateTopDestForm.controls['destination'].setValue('Mumbai');
    component.updateTopDestForm.controls['fare'].setValue('3919');

    expect(component.updateTopDestForm.valid).toBeFalsy();
  })

  it('Update Top Destination from field check - should check Update Top Destination from field is invalid', ()=>{
    let from = component.updateTopDestForm.controls['from'];
    expect(from.valid).toBeFalsy();
    expect(from.pristine).toBeTruthy();
    expect(from.errors['required']).toBeTruthy();
    from.setValue('Delhi');
  })
  it('Update Top Destination from field check - should check Update Top Destination from field is entered', ()=>{
    let from = component.updateTopDestForm.controls['from'];
    from.setValue('Delhi');
    expect(from.errors).toBeNull();
  })

  it('Update Top Destination destination field check - should check Update Top Destination destination field is invalid', ()=>{
    let destination = component.updateTopDestForm.controls['destination'];
    expect(destination.valid).toBeFalsy();
    expect(destination.pristine).toBeTruthy();
    expect(destination.errors['required']).toBeTruthy();
    destination.setValue('Mumbai');
  })
  it('Update Top Destination destination field check - should check Update Top Destination destination field is entered', ()=>{
    let destination = component.updateTopDestForm.controls['destination'];
    destination.setValue('Mumbai');
    expect(destination.errors).toBeNull();
  })

  it('Update Top Destination fare field check - should check Update Top Destination fare field is invalid', ()=>{
    let fare = component.updateTopDestForm.controls['fare'];
    expect(fare.valid).toBeFalsy();
    expect(fare.pristine).toBeTruthy();
    expect(fare.errors['required']).toBeTruthy();
    fare.setValue('3919');
  })
  it('Update Top Destination fare field check - should check Update Top Destination fare field is entered', ()=>{
    let fare = component.updateTopDestForm.controls['fare'];
    fare.setValue('3919');
    expect(fare.errors).toBeNull();
  })

});
