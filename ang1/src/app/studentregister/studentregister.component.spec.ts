import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegisterComponent } from './studentregister.component';

describe('StudentregisterComponent', () => {
  let component: StudentRegisterComponent;
  let fixture: ComponentFixture<StudentRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRegisterComponent]
    });
    fixture = TestBed.createComponent(StudentRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
