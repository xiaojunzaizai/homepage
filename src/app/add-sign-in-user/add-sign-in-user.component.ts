import { Component, OnInit } from '@angular/core';
import { SignInAuthService } from '../sign-in-auth.service';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { consoleLog, consoleError } from '../util-tool/messageConsoleUtil';


@Component({
  selector: 'app-add-sign-in-user',
  templateUrl: './add-sign-in-user.component.html',
  styleUrl: './add-sign-in-user.component.css'
})
export class AddSignInUserComponent implements OnInit {

  validateAddUserForm!: FormGroup<{
    firstName: FormControl<string>;
    middleName: FormControl<string>;
    lastName: FormControl<string>;
  }>;

  constructor(
    private signInAuthService: SignInAuthService,
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
    if (this.validateAddUserForm.valid) {

      consoleLog('submit', this.validateAddUserForm.value);
    } else {
      Object.values(this.validateAddUserForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
