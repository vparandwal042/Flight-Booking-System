import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminService } from 'src/app/admin/admin.service';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { FlightService } from '../flight.service';

import { AirlinesComponent } from './airlines.component';

describe('AirlinesComponent', () => {
  let component: AirlinesComponent;
  let fixture: ComponentFixture<AirlinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ AirlinesComponent ],
      providers: [ FlightService, AdminService, ConfirmDialogService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
