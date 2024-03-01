import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInDetailComponent } from './sign-in-detail.component';

describe('SignInDetailComponent', () => {
  let component: SignInDetailComponent;
  let fixture: ComponentFixture<SignInDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignInDetailComponent]
    });
    fixture = TestBed.createComponent(SignInDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
