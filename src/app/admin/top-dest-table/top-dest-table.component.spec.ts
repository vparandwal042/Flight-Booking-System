import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDestTableComponent } from './top-dest-table.component';

describe('TopDestTableComponent', () => {
  let component: TopDestTableComponent;
  let fixture: ComponentFixture<TopDestTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopDestTableComponent ]
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
});
