import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStepsComponent } from './form-steps.component';

describe('FormStepsComponent', () => {
  let component: FormStepsComponent;
  let fixture: ComponentFixture<FormStepsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormStepsComponent]
    });
    fixture = TestBed.createComponent(FormStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
