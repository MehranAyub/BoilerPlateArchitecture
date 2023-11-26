import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePropertiesComponent } from './sale-properties.component';

describe('SalePropertiesComponent', () => {
  let component: SalePropertiesComponent;
  let fixture: ComponentFixture<SalePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
