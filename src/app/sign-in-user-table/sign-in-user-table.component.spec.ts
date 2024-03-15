import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInUserTableComponent } from './sign-in-user-table.component';

describe('SignInUserTableComponent', () => {
  let component: SignInUserTableComponent;
  let fixture: ComponentFixture<SignInUserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInUserTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignInUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
