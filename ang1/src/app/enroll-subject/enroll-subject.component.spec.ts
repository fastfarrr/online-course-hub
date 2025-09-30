import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollSubjectComponent } from './enroll-subject.component';

describe('EnrollSubjectComponent', () => {
  let component: EnrollSubjectComponent;
  let fixture: ComponentFixture<EnrollSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollSubjectComponent]
    });
    fixture = TestBed.createComponent(EnrollSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
