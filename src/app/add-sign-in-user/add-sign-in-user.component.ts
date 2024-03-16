import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInAuthService } from '../services/sign-in-auth.service';
import { SignInUserService } from '../services/sign-in-user.service';
import { SignInUser } from '../interface/signInUser';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { consoleLog, consoleError, formatForm, isExistedByFirstname, isExistedByLastname } from '../util-tool/utilManagement';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';


@Component({
  selector: 'app-add-sign-in-user',
  templateUrl: './add-sign-in-user.component.html',
  styleUrl: './add-sign-in-user.component.css'
})
export class AddSignInUserComponent implements OnInit {

  isLoading:boolean=false;
  isDisable:boolean=false;
  isUserExist: boolean = false;

  validateAddUserForm!: FormGroup<{
    firstName: FormControl<string>;
    middleName: FormControl<string>;
    lastName: FormControl<string>;
  }>;

  constructor(
    private signInAuthService: SignInAuthService,
    private signInUserService: SignInUserService,
    private router: Router,
    private fb: NonNullableFormBuilder)
    {
      this.validateAddUserForm=this.fb.group({
        firstName:['',[Validators.required]],
        middleName:['',[Validators.nullValidator]],
        lastName:['',[Validators.required]]
      });
    }

  ngOnInit(): void {
    this.signInAuthService.updateUserId(-1);
  }

  submitForm(): void {
    this.isLoading = true;
    this.isDisable = true;
    const { firstName,middleName, lastName } = this.validateAddUserForm.value;
    const newUser: SignInUser= formatForm(this.validateAddUserForm.value);

  if (this.validateAddUserForm.valid && firstName &&lastName) {
    forkJoin({
      firstNameExist: this.signInUserService.searchSignInUserByFirstName(firstName),
      lastNameExist: this.signInUserService.searchSignInUserByLastName(lastName),
    }).pipe(
      switchMap(({ firstNameExist, lastNameExist }) => {
        if (firstNameExist.length > 0 && lastNameExist.length > 0 && (isExistedByFirstname(firstNameExist,lastName,middleName) || isExistedByLastname(lastNameExist,firstName,middleName))) {
          consoleLog('AddSignInUserComponent','User with the same first name or last name already exists.');
          return of(null); // Indicates duplication
        } else {
          return this.signInUserService.addSignInUser(formatForm(this.validateAddUserForm.value));
        }
      }),
      catchError(error => {
        consoleError('Error checking user', error);
        return of(null);
      })
    ).subscribe(result => {
      if (result) {
        // Only navigates if the user was successfully added (no duplication found)
        consoleLog('AddSignInUserComponent : `User added successfully', result);
        this.isUserExist = false;
        this.router.navigate(['/home']);
      } else {
        // Handle duplication or error
        this.isUserExist = true;
        consoleLog('AddSignInUserComponent','User was not added due to duplication or an error');
      }
    });
  } else {
    Object.values(this.validateAddUserForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
  setTimeout(() => {
    this.isLoading = false;
    this.isDisable = false;
  }, 2500);
  }
}
