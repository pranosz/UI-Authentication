import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNamePasswordComponent } from './user-name-password.component';

describe('UserNamePasswordComponent', () => {
  let component: UserNamePasswordComponent;
  let fixture: ComponentFixture<UserNamePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserNamePasswordComponent]
    });
    fixture = TestBed.createComponent(UserNamePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
