import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessoneditNavbarComponent } from './lessonedit-navbar.component';

describe('LessoneditNavbarComponent', () => {
  let component: LessoneditNavbarComponent;
  let fixture: ComponentFixture<LessoneditNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessoneditNavbarComponent]
    });
    fixture = TestBed.createComponent(LessoneditNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
