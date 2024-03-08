import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSignInUserComponent } from './add-sign-in-user.component';

describe('AddSignInUserComponent', () => {
  let component: AddSignInUserComponent;
  let fixture: ComponentFixture<AddSignInUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSignInUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSignInUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
