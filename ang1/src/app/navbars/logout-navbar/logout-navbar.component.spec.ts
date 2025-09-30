import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutNavbarComponent } from './logout-navbar.component';

describe('LogoutNavbarComponent', () => {
  let component: LogoutNavbarComponent;
  let fixture: ComponentFixture<LogoutNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutNavbarComponent]
    });
    fixture = TestBed.createComponent(LogoutNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
