import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralUsersComponent } from './referral-users.component';

describe('ReferralUsersComponent', () => {
  let component: ReferralUsersComponent;
  let fixture: ComponentFixture<ReferralUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
