import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineTableComponent } from './airline-table.component';

describe('AirlineTableComponent', () => {
  let component: AirlineTableComponent;
  let fixture: ComponentFixture<AirlineTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineTableComponent ]
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
