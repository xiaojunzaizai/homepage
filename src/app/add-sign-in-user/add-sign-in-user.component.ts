import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInAuthService } from '../sign-in-auth.service';
import { SignInUserService } from '../sign-in-user.service';
import { SignInUser } from '../signInUser';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { consoleLog, consoleError, formatForm } from '../util-tool/utilManagement';


@Component({
  selector: 'app-add-sign-in-user',
  templateUrl: './add-sign-in-user.component.html',
  styleUrl: './add-sign-in-user.component.css'
})
export class AddSignInUserComponent implements OnInit {

  isLoading:boolean=false;
  isDisable:boolean=false;

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
    if (this.validateAddUserForm.valid) {
      setTimeout(() => {
        this.isLoading = false;
        this.isDisable = false;
      }, 5000);
      consoleLog('submit', this.validateAddUserForm.value);
      const newUser: SignInUser= formatForm(this.validateAddUserForm.value);
      this.signInUserService.addSignInUser(newUser).subscribe({
        next: (newSignInUser) => {
          // 处理成功响应
          consoleLog('User added successfully', newSignInUser);
          this.router.navigate(['/home']);
          // 可以在这里做一些成功后的逻辑，比如跳转页面或显示通知
        },
        error: (error) => {
          // 处理错误响应
          consoleError('Error adding user', error);
          // 可以在这里处理错误，比如显示错误消息
        }
      });
    } else {
      Object.values(this.validateAddUserForm.controls).forEach(control => {
        if (control.invalid) {
          this.isLoading = false;
          this.isDisable = false;
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
