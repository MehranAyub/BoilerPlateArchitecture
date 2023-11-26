import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentPropertiesComponent } from './rent-properties.component';

describe('RentPropertiesComponent', () => {
  let component: RentPropertiesComponent;
  let fixture: ComponentFixture<RentPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
