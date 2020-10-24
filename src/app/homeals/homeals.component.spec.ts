import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomealsComponent } from './homeals.component';

describe('HomealsComponent', () => {
  let component: HomealsComponent;
  let fixture: ComponentFixture<HomealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
